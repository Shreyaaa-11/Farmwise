
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Loader } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '../components/ui/use-toast';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import { supabase } from '../integrations/supabase/client';

const Login = () => {
  const { t } = useLanguage();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Check if there's an existing session on component mount
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate(from);
      }
    };
    
    checkSession();
  }, [navigate, from]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error);
        setAuthError(error.message);
        toast({
          title: "Error",
          description: error.message || "Failed to log in. Please check your credentials and try again.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Success",
        description: "You have been logged in successfully",
      });
      navigate(from);
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "Failed to log in. Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div 
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mt-4 text-gray-800">Welcome back</h1>
          <p className="text-gray-600 mt-2">Please sign in to your account</p>
          <div className="mt-2 p-2 bg-blue-50 rounded-md text-sm text-blue-700">
            <p>Demo Credentials:</p>
            <p>Email: demo@farmwise.com</p>
            <p>Password: password123</p>
          </div>
        </div>
        
        {authError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
            {authError}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-krishi-primary"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t('password')}</label>
              <a href="#" className="text-sm text-krishi-primary hover:text-krishi-dark">{t('forgotPassword')}</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-krishi-primary"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          
          <div>
            <Button 
              type="submit" 
              className="w-full bg-krishi-primary hover:bg-krishi-dark text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader size={16} className="animate-spin mr-2" />
                  Signing in...
                </div>
              ) : (
                t('login')
              )}
            </Button>
          </div>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            {t('dontHaveAccount')} <Link to="/signup" className="text-krishi-primary hover:text-krishi-dark font-medium">{t('signup')}</Link>
          </p>
        </div>
        
        <div className="mt-8">
          <Button asChild variant="outline" className="w-full">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
