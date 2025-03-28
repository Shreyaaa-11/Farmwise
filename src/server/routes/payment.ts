import express from 'express';
import { stripe } from '../config/stripe';
import { supabase } from '../config/supabase';

const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, equipmentId, rentalDuration, userId } = req.body;

    // Validate the request
    if (!amount || !equipmentId || !rentalDuration || !userId) {
      return res.status(400).json({
        error: 'Missing required fields'
      });
    }

    // Get equipment details from database
    const { data: equipment, error: equipmentError } = await supabase
      .from('equipment')
      .select('*')
      .eq('id', equipmentId)
      .single();

    if (equipmentError || !equipment) {
      return res.status(404).json({
        error: 'Equipment not found'
      });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'inr',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        equipmentId,
        rentalDuration,
        userId,
        equipmentName: equipment.name
      }
    });

    // Create a pending rental record in the database
    const { error: rentalError } = await supabase
      .from('rentals')
      .insert({
        equipment_id: equipmentId,
        user_id: userId,
        start_date: new Date(),
        end_date: new Date(Date.now() + rentalDuration * 24 * 60 * 60 * 1000),
        total_price: amount,
        status: 'pending',
        payment_intent_id: paymentIntent.id
      });

    if (rentalError) {
      console.error('Error creating rental record:', rentalError);
      return res.status(500).json({
        error: 'Failed to create rental record'
      });
    }

    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      error: 'Failed to create payment intent'
    });
  }
});

export default router; 