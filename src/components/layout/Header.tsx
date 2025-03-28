
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useLanguage, Language } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLanguageDropdown = () => setIsLanguageDropdownOpen(!isLanguageDropdownOpen);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsLanguageDropdownOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      {/* Main navigation with language selector at the top-right */}
      <header className="bg-white py-3 px-4 md:px-8 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="https://images.unsplash.com/photo-1585148870686-c10872bf09ef?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=50" alt="Farmwise" className="h-12" />
            <div className="text-krishi-primary">
              <h1 className="font-bold text-xl">Farmwise</h1>
              <p className="text-xs text-krishi-secondary">Your farming equipment partner</p>
            </div>
          </Link>

          <div className="flex items-center">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <Link to="/" className="px-3 py-2 text-krishi-primary hover:text-krishi-dark font-medium">{t('home')}</Link>
              <Link to="/dashboard" className="px-3 py-2 text-krishi-primary hover:text-krishi-dark font-medium">{t('dashboard')}</Link>
              <Link to="/equipment" className="px-3 py-2 text-krishi-primary hover:text-krishi-dark font-medium">{t('equipment')}</Link>
              <Link to="/about" className="px-3 py-2 text-krishi-primary hover:text-krishi-dark font-medium">{t('about')}</Link>
              
              <div className="ml-6 flex space-x-3 items-center">
                {!user ? (
                  <>
                    <Button asChild variant="outline" className="border-krishi-primary text-krishi-primary hover:bg-krishi-primary hover:text-white">
                      <Link to="/login">{t('login')}</Link>
                    </Button>
                    <Button asChild className="bg-krishi-primary hover:bg-krishi-dark text-white">
                      <Link to="/signup">{t('signup')}</Link>
                    </Button>
                    
                    {/* Language Selector - Moved next to signup button */}
                    <div className="relative ml-3">
                      <button 
                        onClick={toggleLanguageDropdown}
                        className="flex items-center space-x-2 text-krishi-primary bg-krishi-accent px-3 py-1 rounded"
                      >
                        <Globe size={16} />
                        <span className="text-sm hidden md:inline">{language === 'english' ? 'English' : 'ಕನ್ನಡ'}</span>
                        <ChevronDown size={16} />
                      </button>
                      
                      {isLanguageDropdownOpen && (
                        <div className="language-dropdown animate-fade-in">
                          <div 
                            className={`language-option ${language === 'english' ? 'bg-krishi-accent text-krishi-primary' : ''}`}
                            onClick={() => handleLanguageChange('english')}
                          >
                            English
                          </div>
                          <div 
                            className={`language-option ${language === 'kannada' ? 'bg-krishi-accent text-krishi-primary' : ''}`}
                            onClick={() => handleLanguageChange('kannada')}
                          >
                            ಕನ್ನಡ
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <Button onClick={handleLogout} variant="outline" className="border-krishi-primary text-krishi-primary hover:bg-krishi-primary hover:text-white">
                      Logout
                    </Button>
                    
                    {/* Language Selector for logged in users */}
                    <div className="relative ml-3">
                      <button 
                        onClick={toggleLanguageDropdown}
                        className="flex items-center space-x-2 text-krishi-primary bg-krishi-accent px-3 py-1 rounded"
                      >
                        <Globe size={16} />
                        <span className="text-sm hidden md:inline">{language === 'english' ? 'English' : 'ಕನ್ನಡ'}</span>
                        <ChevronDown size={16} />
                      </button>
                      
                      {isLanguageDropdownOpen && (
                        <div className="language-dropdown animate-fade-in">
                          <div 
                            className={`language-option ${language === 'english' ? 'bg-krishi-accent text-krishi-primary' : ''}`}
                            onClick={() => handleLanguageChange('english')}
                          >
                            English
                          </div>
                          <div 
                            className={`language-option ${language === 'kannada' ? 'bg-krishi-accent text-krishi-primary' : ''}`}
                            onClick={() => handleLanguageChange('kannada')}
                          >
                            ಕನ್ನಡ
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </nav>

            {/* Mobile menu button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden text-krishi-primary hover:text-krishi-dark"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute z-50 w-full animate-slide-in-right">
          <nav className="flex flex-col p-4">
            <Link to="/" className="py-3 border-b border-krishi-border text-krishi-primary hover:text-krishi-dark font-medium" onClick={() => setIsMenuOpen(false)}>
              {t('home')}
            </Link>
            <Link to="/dashboard" className="py-3 border-b border-krishi-border text-krishi-primary hover:text-krishi-dark font-medium" onClick={() => setIsMenuOpen(false)}>
              {t('dashboard')}
            </Link>
            <Link to="/equipment" className="py-3 border-b border-krishi-border text-krishi-primary hover:text-krishi-dark font-medium" onClick={() => setIsMenuOpen(false)}>
              {t('equipment')}
            </Link>
            <Link to="/about" className="py-3 border-b border-krishi-border text-krishi-primary hover:text-krishi-dark font-medium" onClick={() => setIsMenuOpen(false)}>
              {t('about')}
            </Link>
            
            <div className="mt-4 space-y-3">
              {!user ? (
                <>
                  <Button asChild variant="outline" className="w-full border-krishi-primary text-krishi-primary hover:bg-krishi-primary hover:text-white">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>{t('login')}</Link>
                  </Button>
                  <Button asChild className="w-full bg-krishi-primary hover:bg-krishi-dark text-white">
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>{t('signup')}</Link>
                  </Button>
                  {/* Language selector in mobile menu */}
                  <div className="flex items-center justify-between py-3 border-t border-krishi-border">
                    <span className="text-krishi-primary font-medium">Language</span>
                    <div className="flex space-x-2">
                      <button 
                        className={`px-3 py-1 rounded ${language === 'english' ? 'bg-krishi-accent text-krishi-primary' : 'bg-gray-100'}`}
                        onClick={() => handleLanguageChange('english')}
                      >
                        English
                      </button>
                      <button 
                        className={`px-3 py-1 rounded ${language === 'kannada' ? 'bg-krishi-accent text-krishi-primary' : 'bg-gray-100'}`}
                        onClick={() => handleLanguageChange('kannada')}
                      >
                        ಕನ್ನಡ
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Button onClick={() => { handleLogout(); setIsMenuOpen(false); }} variant="outline" className="w-full border-krishi-primary text-krishi-primary hover:bg-krishi-primary hover:text-white">
                    Logout
                  </Button>
                  {/* Language selector in mobile menu for logged in users */}
                  <div className="flex items-center justify-between py-3 border-t border-krishi-border">
                    <span className="text-krishi-primary font-medium">Language</span>
                    <div className="flex space-x-2">
                      <button 
                        className={`px-3 py-1 rounded ${language === 'english' ? 'bg-krishi-accent text-krishi-primary' : 'bg-gray-100'}`}
                        onClick={() => handleLanguageChange('english')}
                      >
                        English
                      </button>
                      <button 
                        className={`px-3 py-1 rounded ${language === 'kannada' ? 'bg-krishi-accent text-krishi-primary' : 'bg-gray-100'}`}
                        onClick={() => handleLanguageChange('kannada')}
                      >
                        ಕನ್ನಡ
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
