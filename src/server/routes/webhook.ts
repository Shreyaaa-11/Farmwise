import express from 'express';
import { stripe } from '../config/stripe';
import { supabase } from '../config/supabase';

const router = express.Router();

// This is your Stripe webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret!);
  } catch (err: any) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      
      // Update the rental status in the database
      const { error: updateError } = await supabase
        .from('rentals')
        .update({ status: 'active' })
        .eq('payment_intent_id', paymentIntent.id);

      if (updateError) {
        console.error('Error updating rental status:', updateError);
        return res.status(500).json({ error: 'Failed to update rental status' });
      }

      // You can also send a confirmation email to the user here
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      
      // Update the rental status to failed
      const { error: failureError } = await supabase
        .from('rentals')
        .update({ status: 'failed' })
        .eq('payment_intent_id', failedPayment.id);

      if (failureError) {
        console.error('Error updating rental status:', failureError);
        return res.status(500).json({ error: 'Failed to update rental status' });
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

export default router; 