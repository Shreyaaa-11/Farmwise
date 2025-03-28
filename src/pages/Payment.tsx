import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { Loader } from 'lucide-react';
import { toast } from '../components/ui/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { createPaymentIntent } from '../services/payment';

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || '');

const PaymentForm = ({ amount, equipmentName, rentalDuration }: { amount: number; equipmentName: string; rentalDuration: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message || "Something went wrong with the payment",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="w-full bg-krishi-primary hover:bg-krishi-dark text-white"
      >
        {isProcessing ? (
          <div className="flex items-center">
            <Loader size={16} className="animate-spin mr-2" />
            Processing...
          </div>
        ) : (
          `Pay ₹${amount}`
        )}
      </Button>
    </form>
  );
};

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login to make a payment",
      });
      navigate('/login', { state: { from: '/payment' } });
      return;
    }

    const initializePayment = async () => {
      try {
        const { clientSecret, error } = await createPaymentIntent({
          amount: location.state?.amount,
          equipmentId: location.state?.equipmentId,
          rentalDuration: location.state?.rentalDuration,
        });

        if (error) {
          throw new Error(error);
        }

        setClientSecret(clientSecret);
      } catch (error: any) {
        console.error('Error creating payment intent:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to initialize payment",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializePayment();
  }, [user, navigate, location.state]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin mr-2 text-krishi-primary">
            <Loader size={30} />
          </div>
          <p>Loading payment details...</p>
        </div>
      </Layout>
    );
  }

  if (!clientSecret) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Payment Error</h1>
          <p className="mb-6">Failed to initialize payment. Please try again.</p>
          <Button asChild className="bg-krishi-primary hover:bg-krishi-dark text-white">
            <a href="/equipment">Back to Equipment</a>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Complete Your Payment</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Equipment:</span>
                <span className="font-medium">{location.state?.equipmentName}</span>
              </div>
              <div className="flex justify-between">
                <span>Rental Duration:</span>
                <span className="font-medium">{location.state?.rentalDuration} day(s)</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total Amount:</span>
                <span className="text-krishi-primary">₹{location.state?.amount}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm
                amount={location.state?.amount}
                equipmentName={location.state?.equipmentName}
                rentalDuration={location.state?.rentalDuration}
              />
            </Elements>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment; 