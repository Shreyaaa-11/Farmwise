
import React from 'react';
import Layout from '../components/layout/Layout';
import { useLanguage } from '../contexts/LanguageContext';
import { Check, Users, Truck, Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const { t } = useLanguage();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const features = [
    "Connect farmers with equipment owners for rentals",
    "Purchase new and used farming equipment",
    "Reduce capital costs for small farmers",
    "Optimize equipment utilization for owners",
    "Increase agricultural productivity and efficiency",
    "Build a community of farming professionals"
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-krishi-primary text-white py-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">About Krishi Sadhan</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">Empowering farmers with access to the right equipment at the right time</p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-krishi-primary">Our Mission</h2>
              <p className="text-gray-700 mb-6">Krishi Sadhan is dedicated to transforming agriculture by making modern farming equipment accessible to all farmers through innovative rental and purchase solutions. We believe that every farmer, regardless of farm size, should have access to the best tools and technologies to enhance productivity.</p>
              <p className="text-gray-700">By connecting equipment owners with farmers who need them, we create a win-win ecosystem that optimizes resource utilization, reduces capital costs, and promotes sustainable farming practices.</p>
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              <img 
                src="/lovable-uploads/40ffc290-2562-41e7-beb1-2e4f20318caf.png" 
                alt="Farming Equipment" 
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="text-center mb-12"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-krishi-primary">What We Do</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">Krishi Sadhan provides a comprehensive platform that addresses the key challenges facing modern agriculture.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm"
                variants={fadeIn}
              >
                <div className="flex items-start">
                  <div className="bg-krishi-accent p-2 rounded-full mr-4">
                    <Check className="text-krishi-primary" size={20} />
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="text-center mb-12"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-krishi-primary">Our Team</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Krishi Sadhan is powered by a passionate team of agricultural experts, technology enthusiasts, and business professionals who share a common goal of transforming Indian agriculture.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {['Team Member 1', 'Team Member 2', 'Team Member 3', 'Team Member 4'].map((member, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden text-center"
                variants={fadeIn}
              >
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <Users size={64} className="text-gray-400" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1">{member}</h3>
                  <p className="text-sm text-gray-600">Position</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-krishi-accent">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="p-6"
            >
              <h3 className="text-4xl font-bold text-krishi-primary mb-2">1,500+</h3>
              <p className="text-gray-700">Equipment Listings</p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="p-6"
            >
              <h3 className="text-4xl font-bold text-krishi-primary mb-2">10,000+</h3>
              <p className="text-gray-700">Farmers Served</p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="p-6"
            >
              <h3 className="text-4xl font-bold text-krishi-primary mb-2">500+</h3>
              <p className="text-gray-700">Rural Communities</p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="p-6"
            >
              <h3 className="text-4xl font-bold text-krishi-primary mb-2">95%</h3>
              <p className="text-gray-700">Customer Satisfaction</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="text-center mb-12"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-krishi-primary">Contact Us</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Have questions or feedback? Our team is here to help. Reach out to us using any of the methods below.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="p-6 bg-white rounded-lg shadow-sm text-center"
            >
              <div className="bg-krishi-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="text-krishi-primary" size={24} />
              </div>
              <h3 className="font-bold mb-2">Call Us</h3>
              <p className="text-gray-700">+91 1234567890</p>
              <p className="text-gray-600 text-sm">Monday to Saturday, 9am to 6pm</p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="p-6 bg-white rounded-lg shadow-sm text-center"
            >
              <div className="bg-krishi-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="text-krishi-primary" size={24} />
              </div>
              <h3 className="font-bold mb-2">Email Us</h3>
              <p className="text-gray-700">info@krishisadhan.com</p>
              <p className="text-gray-600 text-sm">We'll respond within 24 hours</p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="p-6 bg-white rounded-lg shadow-sm text-center"
            >
              <div className="bg-krishi-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-krishi-primary" size={24} />
              </div>
              <h3 className="font-bold mb-2">Visit Us</h3>
              <p className="text-gray-700">123 Agricultural Hub, Bangalore</p>
              <p className="text-gray-600 text-sm">Karnataka, India 560001</p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
