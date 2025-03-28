
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Equipment as EquipmentType, getEquipment } from '../services/database';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';

const Equipment = () => {
  const { t } = useLanguage();
  const [equipment, setEquipment] = useState<EquipmentType[]>([]);
  const [filteredEquipment, setFilteredEquipment] = useState<EquipmentType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Categories
  const categories = [
    { id: 'all', name: 'All Equipment' },
    { id: 'tractors', name: t('tractors') },
    { id: 'tillageEquipment', name: t('tillageEquipment') },
    { id: 'seedingEquipment', name: t('seedingEquipment') },
    { id: 'landscapeEquipment', name: t('landscapeEquipment') },
    { id: 'cropProtection', name: t('cropProtection') },
    { id: 'harvestEquipment', name: t('harvestEquipment') },
    { id: 'postHarvest', name: t('postHarvest') },
    { id: 'haulage', name: t('haulage') },
  ];

  useEffect(() => {
    const loadEquipment = async () => {
      try {
        setIsLoading(true);
        const data = await getEquipment();
        setEquipment(data);
        setFilteredEquipment(data);
      } catch (error) {
        console.error('Error loading equipment:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEquipment();
  }, []);

  useEffect(() => {
    // Filter equipment based on search term and category
    let result = equipment;
    
    if (searchTerm) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category === selectedCategory);
    }
    
    setFilteredEquipment(result);
  }, [searchTerm, selectedCategory, equipment]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-krishi-primary text-white py-12">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Farm Equipment</h1>
          <p className="text-lg max-w-2xl">Browse our wide selection of farming equipment available for rent or purchase. Find the perfect tools for your agricultural needs.</p>
        </div>
      </section>

      {/* Equipment Listing Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          {/* Search and Filter Bar */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
                <input
                  type="text"
                  placeholder="Search equipment..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-krishi-primary"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              <button 
                className="flex items-center text-krishi-primary hover:text-krishi-dark md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} className="mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
            
            {/* Category Filters - Desktop */}
            <div className="hidden md:flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedCategory === category.id 
                      ? 'bg-krishi-primary text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* Category Filters - Mobile */}
            {showFilters && (
              <div className="md:hidden flex flex-col space-y-2 mt-4 border-t pt-4">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`px-4 py-2 rounded-md text-sm text-left ${
                      selectedCategory === category.id 
                        ? 'bg-krishi-primary text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Equipment Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-gray-200 h-48"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2 w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredEquipment.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEquipment.map((item, index) => (
                <motion.div 
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Rent</p>
                        <p className="font-bold text-krishi-primary">₹{item.rentalPrice}/day</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Buy</p>
                        <p className="font-bold text-krishi-primary">₹{item.price}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button asChild className="flex-1 bg-krishi-primary hover:bg-krishi-dark text-white">
                        <Link to={`/equipment/${item.id}`}>{t('viewDetails')}</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold mb-2">No equipment found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <Button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                className="bg-krishi-primary hover:bg-krishi-dark text-white"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Equipment;
