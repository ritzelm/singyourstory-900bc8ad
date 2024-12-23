import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/cN24ii7Uk12W8XSaEE";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.json();
    
    // Generate order ID (timestamp + random string)
    const timestamp = new Date().getTime();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const orderId = `ORDER-${timestamp}-${randomStr}`;

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    // Store order in database
    const { error: dbError } = await supabaseClient
      .from('orders')
      .insert({
        order_id: orderId,
        ...formData
      });

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`);
    }

    // Send email
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
      <p><strong>Hobbys:</strong> ${formData.hobbies}</p>
      <p><strong>Lieblingsdinge:</strong> ${formData.favorites}</p>
      <p><strong>Familienmitglieder:</strong> ${formData.familyMembers}</p>
    `;

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "MeinKinderlied <order@meinkinderlied.de>",
        to: ["flo@ritzelmu.de"],
        subject: `Neue Bestellung: ${orderId}`,
        html: emailHtml,
      }),
    });

    if (!emailRes.ok) {
      console.error('Email sending failed:', await emailRes.text());
    }

    // Return checkout URL with order ID
    const checkoutUrl = `${STRIPE_CHECKOUT_URL}?client_reference_id=${orderId}`;

    return new Response(
      JSON.stringify({ url: checkoutUrl, orderId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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