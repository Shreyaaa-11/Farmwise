import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Headphones, Users, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Layout from '../components/layout/Layout';
import { Equipment, getFeaturedEquipment } from '../services/database';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';

const Index = () => {
  const { t } = useLanguage();
  const [featuredEquipment, setFeaturedEquipment] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEquipment = async () => {
      try {
        const equipment = await getFeaturedEquipment();
        setFeaturedEquipment(equipment);
      } catch (error) {
        console.error('Error loading featured equipment:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEquipment();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <Layout>
      {/* Hero Section - Updated with new image */}
      <section className="hero-section relative h-[80vh] flex items-center text-white" 
               style={{
                 backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1920&auto=format&fit=crop')",
                 backgroundSize: "cover",
                 backgroundPosition: "center"
               }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div 
            className="max-w-2xl" 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{t('welcome')}</h1>
            <h2 className="text-2xl md:text-4xl font-bold text-krishi-accent mb-4">
              {t('farmerEquipment')} <span className="text-white">{t('atReasonablePrices')}</span>
            </h2>
            <p className="text-lg mb-8">{t('startNow')}</p>
            <Button asChild size="lg" className="bg-krishi-primary hover:bg-krishi-dark text-white">
              <Link to="/equipment">{t('bookNow')}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{t('whatWeOffer')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('beingAPart')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md text-center card-hover"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <Headphones className="feature-icon" />
              <h3 className="text-xl font-bold mb-4 text-krishi-primary">{t('customerSupport')}</h3>
              <p className="text-gray-600">We're just one call away.</p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md text-center card-hover"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <Users className="feature-icon" />
              <h3 className="text-xl font-bold mb-4 text-krishi-primary">{t('trustedSellers')}</h3>
              <p className="text-gray-600">Ensured safety of your experience.</p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md text-center card-hover"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
            >
              <Clock className="feature-icon" />
              <h3 className="text-xl font-bold mb-4 text-krishi-primary">{t('oneClickBooking')}</h3>
              <p className="text-gray-600">Time saving bookings.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Equipment */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Equipment</h2>
            <Link to="/equipment" className="text-krishi-primary hover:text-krishi-dark flex items-center">
              View all <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredEquipment.map((item, index) => (
                <motion.div 
                  key={item.id}
                  className="equipment-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="equipment-card-overlay">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <div className="flex justify-between mt-2">
                      <span>₹{item.rentalPrice}/day</span>
                      <Link to={`/equipment/${item.id}`} className="text-white bg-krishi-primary hover:bg-krishi-dark px-3 py-1 rounded text-sm">
                        {t('viewDetails')}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section - Updated without image */}
      <section className="py-16 bg-krishi-primary text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg">PLATFORM GUIDE</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div 
              className="bg-white/10 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white text-krishi-primary rounded-full w-10 h-10 flex items-center justify-center font-bold mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Sign up</h3>
              <p>Create your account in seconds and join our community of farmers</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white text-krishi-primary rounded-full w-10 h-10 flex items-center justify-center font-bold mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Explore equipment</h3>
              <p>Browse through our extensive catalog of farming equipment</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-white text-krishi-primary rounded-full w-10 h-10 flex items-center justify-center font-bold mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Contact owner</h3>
              <p>Connect directly with equipment owners to discuss details</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-white text-krishi-primary rounded-full w-10 h-10 flex items-center justify-center font-bold mb-4">4</div>
              <h3 className="text-xl font-bold mb-2">Book equipment</h3>
              <p>Select dates and reserve the equipment you need with a few clicks</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-white text-krishi-primary rounded-full w-10 h-10 flex items-center justify-center font-bold mb-4">5</div>
              <h3 className="text-xl font-bold mb-2">Secure payment</h3>
              <p>Pay securely through our platform with various payment options</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="bg-white text-krishi-primary rounded-full w-10 h-10 flex items-center justify-center font-bold mb-4">6</div>
              <h3 className="text-xl font-bold mb-2">Start farming</h3>
              <p>Receive the equipment and start improving your agricultural output</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">{t('ourCustomers')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div 
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-krishi-primary mb-4 flex justify-center">
                <Users size={64} />
              </div>
              <h3 className="text-4xl font-bold mb-2">1,567,890</h3>
              <p className="text-gray-600">{t('latestAcquiredCustomers')}</p>
            </motion.div>

            <motion.div 
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className={`w-6 h-10 ${i < 4 ? 'text-krishi-primary' : 'text-gray-400'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17 22H7a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2Zm-5-14a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="text-4xl font-bold mb-2">4 out of 5</h3>
              <p className="text-gray-600">{t('satisfiedCustomers')}</p>
            </motion.div>

            <motion.div 
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex justify-center mb-4">
                <div className="relative w-16 h-16">
                  <div className="w-16 h-16 rounded-full bg-gray-300"></div>
                  <div className="absolute top-0 right-0 w-16 h-16 rounded-full border-4 border-krishi-primary border-t-transparent" style={{ transform: 'rotate(60deg)' }}></div>
                </div>
              </div>
              <h3 className="text-4xl font-bold mb-2">16% of Crop value</h3>
              <p className="text-gray-600">{t('averageEquipmentInvestment')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-krishi-accent">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-krishi-primary">Ready to get started?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">Join thousands of farmers who have already benefited from our platform. Rent or buy the best equipment for your farm today.</p>
            <Button asChild size="lg" className="bg-krishi-primary hover:bg-krishi-dark text-white">
              <Link to="/equipment">Browse Equipment</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
