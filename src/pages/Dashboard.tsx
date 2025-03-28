import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Package, CreditCard, Settings, Clock, Tractor, ShoppingBag } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '../components/ui/use-toast';
import { Equipment, getEquipment } from '../services/database';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';

interface Rental {
  id: string;
  equipmentId: string;
  equipmentName: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: 'active' | 'upcoming' | 'completed';
}

interface Purchase {
  id: string;
  equipmentId: string;
  equipmentName: string;
  purchaseDate: Date;
  price: number;
  quantity: number;
  deliveryStatus: 'processing' | 'shipped' | 'delivered';
}

const Dashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'rentals' | 'purchases' | 'payments' | 'settings'>('rentals');
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to access the dashboard",
      });
      navigate('/login', { state: { from: '/dashboard' } });
      return;
    }

    const loadData = async () => {
      try {
        setIsLoading(true);
        
        const allEquipment = await getEquipment();
        const randomEquipment = [...allEquipment].sort(() => 0.5 - Math.random()).slice(0, 3);
        setRecentlyViewed(randomEquipment);
        
        const mockRentals: Rental[] = [
          {
            id: '1',
            equipmentId: '1',
            equipmentName: 'John Deere 5050D Tractor',
            startDate: new Date('2023-08-15'),
            endDate: new Date('2023-08-20'),
            totalPrice: 6000,
            status: 'completed'
          },
          {
            id: '2',
            equipmentId: '3',
            equipmentName: 'Sonalika Disc Harrow',
            startDate: new Date('2023-09-10'),
            endDate: new Date('2023-09-15'),
            totalPrice: 2500,
            status: 'completed'
          },
          {
            id: '3',
            equipmentId: '8',
            equipmentName: 'Honda Brush Cutter',
            startDate: new Date(),
            endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            totalPrice: 1000,
            status: 'active'
          }
        ];
        setRentals(mockRentals);
        
        const mockPurchases: Purchase[] = [
          {
            id: '1',
            equipmentId: '5',
            equipmentName: 'Kubota Rice Transplanter',
            purchaseDate: new Date('2023-07-05'),
            price: 250000,
            quantity: 1,
            deliveryStatus: 'delivered'
          },
          {
            id: '2',
            equipmentId: '10',
            equipmentName: 'Tirth Agro Rotavator',
            purchaseDate: new Date(),
            price: 95000,
            quantity: 1,
            deliveryStatus: 'processing'
          }
        ];
        setPurchases(mockPurchases);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user, navigate]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderRentalsTab = () => (
    <div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium">Active & Upcoming Rentals</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {rentals.filter(rental => rental.status !== 'completed').length > 0 ? (
            rentals
              .filter(rental => rental.status !== 'completed')
              .map(rental => (
                <motion.div 
                  key={rental.id}
                  className="p-6 flex flex-col md:flex-row md:items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-4 md:mb-0">
                    <h4 className="font-medium">{rental.equipmentName}</h4>
                    <p className="text-sm text-gray-500">
                      {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      rental.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      <Clock size={12} className="mr-1" />
                      {rental.status === 'active' ? 'Active' : 'Upcoming'}
                    </span>
                    <span className="mx-4 text-gray-500">₹{rental.totalPrice}</span>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </motion.div>
              ))
          ) : (
            <div className="p-8 text-center">
              <Tractor className="mx-auto mb-4 text-gray-400" size={48} />
              <h4 className="text-lg font-medium mb-2">No active rentals</h4>
              <p className="text-gray-500 mb-4">You don't have any active or upcoming equipment rentals</p>
              <Button asChild className="bg-krishi-primary hover:bg-krishi-dark text-white">
                <a href="/equipment">Rent Equipment</a>
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium">Rental History</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {rentals.filter(rental => rental.status === 'completed').length > 0 ? (
            rentals
              .filter(rental => rental.status === 'completed')
              .map(rental => (
                <motion.div 
                  key={rental.id}
                  className="p-6 flex flex-col md:flex-row md:items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-4 md:mb-0">
                    <h4 className="font-medium">{rental.equipmentName}</h4>
                    <p className="text-sm text-gray-500">
                      {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Completed
                    </span>
                    <span className="mx-4 text-gray-500">₹{rental.totalPrice}</span>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </motion.div>
              ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">No rental history found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderPurchasesTab = () => (
    <div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium">Recent Purchases</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {purchases.length > 0 ? (
            purchases.map(purchase => (
              <motion.div 
                key={purchase.id}
                className="p-6 flex flex-col md:flex-row md:items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-4 md:mb-0">
                  <h4 className="font-medium">{purchase.equipmentName}</h4>
                  <p className="text-sm text-gray-500">
                    Purchased on {formatDate(purchase.purchaseDate)}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    purchase.deliveryStatus === 'delivered' 
                      ? 'bg-green-100 text-green-800' 
                      : purchase.deliveryStatus === 'shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {purchase.deliveryStatus.charAt(0).toUpperCase() + purchase.deliveryStatus.slice(1)}
                  </span>
                  <span className="mx-4 text-gray-500">₹{purchase.price}</span>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-8 text-center">
              <ShoppingBag className="mx-auto mb-4 text-gray-400" size={48} />
              <h4 className="text-lg font-medium mb-2">No purchases yet</h4>
              <p className="text-gray-500 mb-4">You haven't made any purchases yet</p>
              <Button asChild className="bg-krishi-primary hover:bg-krishi-dark text-white">
                <a href="/equipment">Shop Equipment</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderPaymentsTab = () => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium">Payment Methods</h3>
      </div>
      <div className="p-6">
        <div className="mb-8">
          <h4 className="font-medium mb-4">Saved Payment Methods</h4>
          <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-500 text-white p-2 rounded mr-4">
                <CreditCard size={24} />
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-500">Expires 12/25</p>
              </div>
            </div>
            <div>
              <Button variant="outline" size="sm">Remove</Button>
            </div>
          </div>
        </div>
        
        <Button className="w-full bg-krishi-primary hover:bg-krishi-dark text-white">
          Add Payment Method
        </Button>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium">Account Settings</h3>
      </div>
      <div className="p-6">
        <div className="mb-8">
          <h4 className="font-medium mb-4">Personal Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md" 
                value={profile?.full_name || 'User'}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md" 
                value={user?.email || 'user@example.com'}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input 
                type="tel" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md" 
                placeholder="Add phone number"
                value={profile?.phone || ''}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md" 
                placeholder="Add address"
                value={profile?.address || ''}
                readOnly
              />
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h4 className="font-medium mb-4">Security</h4>
          <Button variant="outline" className="mr-4">Change Password</Button>
          <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">Delete Account</Button>
        </div>
        
        <Button className="bg-krishi-primary hover:bg-krishi-dark text-white">
          Save Changes
        </Button>
      </div>
    </div>
  );

  return (
    <Layout>
      {isLoading ? (
        <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin mr-3">
            <Tractor size={24} className="text-krishi-primary" />
          </div>
          <span>Loading dashboard...</span>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome, {profile?.full_name || user?.email?.split('@')[0] || 'Farmer'}</h1>
            <p className="text-gray-600">Manage your equipment rentals, purchases, and account settings</p>
          </div>
          
          <div className="mb-8 border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'rentals'
                    ? 'border-krishi-primary text-krishi-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('rentals')}
              >
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  <span>Rentals</span>
                </div>
              </button>
              <button
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'purchases'
                    ? 'border-krishi-primary text-krishi-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('purchases')}
              >
                <div className="flex items-center">
                  <Package size={18} className="mr-2" />
                  <span>Purchases</span>
                </div>
              </button>
              <button
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'payments'
                    ? 'border-krishi-primary text-krishi-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('payments')}
              >
                <div className="flex items-center">
                  <CreditCard size={18} className="mr-2" />
                  <span>Payments</span>
                </div>
              </button>
              <button
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'settings'
                    ? 'border-krishi-primary text-krishi-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('settings')}
              >
                <div className="flex items-center">
                  <Settings size={18} className="mr-2" />
                  <span>Settings</span>
                </div>
              </button>
            </nav>
          </div>
          
          <div className="mb-8">
            {activeTab === 'rentals' && renderRentalsTab()}
            {activeTab === 'purchases' && renderPurchasesTab()}
            {activeTab === 'payments' && renderPaymentsTab()}
            {activeTab === 'settings' && renderSettingsTab()}
          </div>
          
          {(activeTab === 'rentals' || activeTab === 'purchases') && (
            <div>
              <h2 className="text-xl font-bold mb-4">Recently Viewed</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentlyViewed.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium mb-2 line-clamp-1">{item.name}</h3>
                      <div className="flex justify-between mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Rent</p>
                          <p className="font-medium text-krishi-primary">₹{item.rentalPrice}/day</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Buy</p>
                          <p className="font-medium text-krishi-primary">₹{item.price}</p>
                        </div>
                      </div>
                      <Button asChild className="w-full bg-krishi-primary hover:bg-krishi-dark text-white">
                        <a href={`/equipment/${item.id}`}>View Details</a>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
