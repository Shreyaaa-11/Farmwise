import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Truck, Clock, Info, Loader } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Equipment, getEquipmentById } from '../services/database';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from '../components/ui/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';

const EquipmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rentDuration, setRentDuration] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'rent' | 'buy'>('rent');

  useEffect(() => {
    const loadEquipment = async () => {
      try {
        setIsLoading(true);
        if (id) {
          const data = await getEquipmentById(id);
          if (data) {
            setEquipment(data);
          } else {
            toast({
              title: "Error",
              description: "Equipment not found",
              variant: "destructive",
            });
            navigate('/equipment');
          }
        }
      } catch (error) {
        console.error('Error loading equipment details:', error);
        toast({
          title: "Error",
          description: "Failed to load equipment details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadEquipment();
  }, [id, navigate]);

  const handleRentDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setRentDuration(value);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  const handleRent = () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login to rent equipment",
      });
      navigate('/login', { state: { from: `/equipment/${id}` } });
      return;
    }

    if (!equipment) return;

    const totalAmount = equipment.rentalPrice * rentDuration;
    
    navigate('/payment', {
      state: {
        amount: totalAmount,
        equipmentId: equipment.id,
        equipmentName: equipment.name,
        rentalDuration: rentDuration
      }
    });
  };

  const handleBuy = () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login to buy equipment",
      });
      navigate('/login', { state: { from: `/equipment/${id}` } });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Success",
        description: `${equipment?.name} purchased successfully!`,
      });
      navigate('/dashboard');
    }, 2000);
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin mr-2 text-krishi-primary">
            <Loader size={30} />
          </div>
          <p>Loading equipment details...</p>
        </div>
      </Layout>
    );
  }

  if (!equipment) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Equipment not found</h1>
          <p className="mb-6">Sorry, we couldn't find the equipment you're looking for.</p>
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
        {/* Breadcrumb */}
        <button 
          onClick={() => navigate('/equipment')}
          className="flex items-center text-krishi-primary hover:text-krishi-dark mb-8"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Equipment
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Equipment Image */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="bg-white p-4 rounded-lg shadow-sm"
          >
            <img 
              src={equipment.image} 
              alt={equipment.name}
              className="w-full h-auto rounded-lg object-cover"
            />
          </motion.div>

          {/* Equipment Details */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold mb-2">{equipment.name}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center bg-krishi-accent text-krishi-primary px-3 py-1 rounded-full text-sm">
                <Tag size={14} className="mr-1" />
                {t(equipment.category as any)}
              </span>
              <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                <Info size={14} className="mr-1" />
                {equipment.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <p className="text-gray-700 mb-6">{equipment.description}</p>

            <div className="flex space-x-2 mb-6">
              <button
                className={`flex-1 py-2 rounded-md ${
                  selectedTab === 'rent' 
                    ? 'bg-krishi-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedTab('rent')}
              >
                {t('rent')}
              </button>
              <button
                className={`flex-1 py-2 rounded-md ${
                  selectedTab === 'buy' 
                    ? 'bg-krishi-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedTab('buy')}
              >
                {t('buy')}
              </button>
            </div>

            {selectedTab === 'rent' ? (
              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Calendar size={18} className="text-krishi-primary mr-2" />
                    <span>Rental Duration</span>
                  </div>
                  <div className="flex items-center">
                    <button 
                      onClick={() => rentDuration > 1 && setRentDuration(rentDuration - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      min="1"
                      value={rentDuration}
                      onChange={handleRentDurationChange}
                      className="w-16 text-center mx-2 border border-gray-200 rounded-md"
                    />
                    <button 
                      onClick={() => setRentDuration(rentDuration + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between mb-6">
                  <span className="text-gray-600">Daily Rental Price:</span>
                  <span className="font-bold">₹{equipment.rentalPrice}/day</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between">
                    <span className="font-bold">Total Price:</span>
                    <span className="font-bold text-krishi-primary">₹{equipment.rentalPrice * rentDuration}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleRent}
                  disabled={isProcessing || !equipment.inStock}
                  className="w-full bg-krishi-primary hover:bg-krishi-dark text-white"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <Loader size={16} className="animate-spin mr-2" />
                      Processing...
                    </div>
                  ) : !equipment.inStock ? (
                    'Out of Stock'
                  ) : (
                    'Rent Now'
                  )}
                </Button>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Truck size={18} className="text-krishi-primary mr-2" />
                    <span>Quantity</span>
                  </div>
                  <div className="flex items-center">
                    <button 
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-16 text-center mx-2 border border-gray-200 rounded-md"
                    />
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between mb-6">
                  <span className="text-gray-600">Unit Price:</span>
                  <span className="font-bold">₹{equipment.price}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between">
                    <span className="font-bold">Total Price:</span>
                    <span className="font-bold text-krishi-primary">₹{equipment.price * quantity}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleBuy}
                  disabled={isProcessing || !equipment.inStock}
                  className="w-full bg-krishi-primary hover:bg-krishi-dark text-white"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <Loader size={16} className="animate-spin mr-2" />
                      Processing...
                    </div>
                  ) : !equipment.inStock ? (
                    'Out of Stock'
                  ) : (
                    'Buy Now'
                  )}
                </Button>
              </div>
            )}

            <div className="bg-krishi-accent p-4 rounded-lg">
              <div className="flex items-start mb-2">
                <Clock size={18} className="text-krishi-primary mr-2 mt-1" />
                <div>
                  <p className="font-medium text-krishi-primary">Delivery Information</p>
                  <p className="text-sm text-gray-700">Delivery within 3-5 business days after order confirmation</p>
                </div>
              </div>
              <div className="flex items-start">
                <Info size={18} className="text-krishi-primary mr-2 mt-1" />
                <div>
                  <p className="font-medium text-krishi-primary">Return Policy</p>
                  <p className="text-sm text-gray-700">30-day return policy for purchased equipment in unopened condition</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default EquipmentDetail;
