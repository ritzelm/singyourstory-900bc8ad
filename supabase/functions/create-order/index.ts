import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/cN24ii7Uk12W8XSaEE";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received request to create-order function');
    const formData = await req.json();
    console.log('Form data received:', formData);
    
    // Validate required fields
    const requiredFields = ['childName', 'childAge', 'ageGroup', 'occasion', 'genre'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Generate order ID (timestamp + random string)
    const timestamp = new Date().getTime();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const orderId = `ORDER-${timestamp}-${randomStr}`;
    console.log('Generated order ID:', orderId);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Prepare order data
    const orderData = {
      order_id: orderId,
      child_name: formData.childName,
      child_age: formData.childAge,
      age_group: formData.ageGroup,
      occasion: formData.occasion,
      genre: formData.genre,
      hobbies: formData.hobbies || null,
      favorites: formData.favorites || null,
      family_members: formData.familyMembers || null,
      status: 'pending'
    };

    console.log('Attempting to store order in database:', orderData);
    const { data: insertedData, error: dbError } = await supabaseClient
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }
    console.log('Order stored successfully:', insertedData);

    // Send email notification
    try {
      const emailHtml = `
        <h1>Neue Bestellung: ${orderId}</h1>
        <h2>Kinderinformationen:</h2>
        <p><strong>Name:</strong> ${formData.childName}</p>
        <p><strong>Alter:</strong> ${formData.childAge}</p>
        <p><strong>Altersgruppe:</strong> ${formData.ageGroup}</p>
        <h2>Songdetails:</h2>
        <p><strong>Anlass:</strong> ${formData.occasion}</p>
        <p><strong>Genre:</strong> ${formData.genre}</p>
        <h2>Weitere Details:</h2>
        <p><strong>Hobbys:</strong> ${formData.hobbies || '-'}</p>
        <p><strong>Lieblingsdinge:</strong> ${formData.favorites || '-'}</p>
        <p><strong>Familienmitglieder:</strong> ${formData.familyMembers || '-'}</p>
      `;

      console.log('Sending email notification...');
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "MeinKinderlied <order@meinkinderlied.de>",
          to: ["flo@ritzelmut.de"],
          subject: `Neue Bestellung: ${orderId}`,
          html: emailHtml,
        }),
      });

      if (!emailRes.ok) {
        const emailError = await emailRes.text();
        console.error('Email sending failed:', emailError);
        // Don't throw here, continue with order processing
      } else {
        console.log('Email sent successfully');
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't throw here, continue with order processing
    }

    // Return checkout URL with order ID
    const checkoutUrl = `${STRIPE_CHECKOUT_URL}?client_reference_id=${orderId}`;
    console.log('Returning checkout URL:', checkoutUrl);

    return new Response(
      JSON.stringify({ url: checkoutUrl, orderId }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error processing order:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
