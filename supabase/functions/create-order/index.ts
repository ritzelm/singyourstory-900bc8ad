import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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
    
    // Check if RESEND_API_KEY is set
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      throw new Error('Email configuration error');
    }

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

    // Trigger background webhook
    (async () => {
      try {
        const alertResponse = await fetch("http://tunnel.ritzelmut.de:5000/blink", { method: "GET" });
        if (!alertResponse.ok) {
          console.error("Alert webhook failed:", await alertResponse.text());
        } else {
          console.log("Alert webhook triggered successfully.");
        }
      } catch (webhookError) {
        console.error("Error triggering alert webhook:", webhookError);
      }
    })();

    // Send email notification
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

    console.log('Attempting to send email notification...');
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "MeinKinderlied <order@meinkinderlied.de>",
        to: ["florian@precisionx.com", "david@precisionx.com"], 
        subject: `Neue Bestellung: ${orderId}`,
        html: emailHtml,
      }),
    });

    if (!emailRes.ok) {
      const emailError = await emailRes.text();
      console.error('Email sending failed:', emailError);
      throw new Error(`Email sending failed: ${emailError}`);
    }

    const emailData = await emailRes.json();
    console.log('Email sent successfully:', emailData);

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
