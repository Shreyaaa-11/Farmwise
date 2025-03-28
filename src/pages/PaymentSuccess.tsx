import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { toast } from '../components/ui/use-toast';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast({
      title: "Payment Successful!",
      description: "Your equipment rental has been confirmed.",
    });
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
          <p className="text-gray-600 mb-8">
            Your payment has been processed successfully. You will receive a confirmation email shortly.
          </p>
          
          <div className="space-x-4">
            <Button
              onClick={() => navigate('/dashboard')}
              className="bg-krishi-primary hover:bg-krishi-dark text-white"
            >
              View Order
            </Button>
            <Button
              onClick={() => navigate('/equipment')}
              variant="outline"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess; 