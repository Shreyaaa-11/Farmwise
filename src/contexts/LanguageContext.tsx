
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'english' | 'kannada';

// Define translations
export type TranslationKey = 
  'home' | 'equipment' | 'about' | 'login' | 'signup' | 'dashboard' | 
  'welcome' | 'farmerEquipment' | 'atReasonablePrices' | 'startNow' | 
  'bookNow' | 'whatWeOffer' | 'beingAPart' | 'customerSupport' | 
  'trustedSellers' | 'oneClickBooking' | 'tractors' | 'tillageEquipment' |
  'seedingEquipment' | 'landscapeEquipment' | 'cropProtection' | 'harvestEquipment' |
  'postHarvest' | 'haulage' | 'rent' | 'buy' | 'viewDetails' | 'addToCart' |
  'howItWorks' | 'signUpPlatform' | 'postAd' | 'provideDetails' | 'exploreFilter' |
  'checkAvailability' | 'chatOwner' | 'stayUpdated' | 'ourServices' | 'askMe' |
  'typeMessage' | 'send' | 'email' | 'password' | 'forgotPassword' | 'name' |
  'confirmPassword' | 'alreadyHaveAccount' | 'dontHaveAccount' | 'ourCustomers' |
  'satisfiedCustomers' | 'latestAcquiredCustomers' | 'averageEquipmentInvestment';

// Translation dictionary
const translations: Record<Language, Record<TranslationKey, string>> = {
  english: {
    home: 'Home',
    equipment: 'Equipment',
    about: 'About',
    login: 'Login',
    signup: 'Sign Up',
    dashboard: 'Dashboard',
    welcome: 'Namaste, welcome to Krishi Sadhan.',
    farmerEquipment: 'Farmer\'s Equipment',
    atReasonablePrices: 'at reasonable and affordable prices.',
    startNow: 'Start now with just one click.',
    bookNow: 'Book Now',
    whatWeOffer: 'WHAT WE OFFER',
    beingAPart: 'Being a part of Krishi Sadhan, this is what you get from us:',
    customerSupport: '24*7 customer support',
    trustedSellers: 'Trusted Sellers/Buyers',
    oneClickBooking: 'One-click Booking',
    tractors: 'Tractors',
    tillageEquipment: 'Tillage Equipment',
    seedingEquipment: 'Seeding Equipment',
    landscapeEquipment: 'Landscape Equipment',
    cropProtection: 'Crop Protection',
    harvestEquipment: 'Harvest Equipment',
    postHarvest: 'Post Harvest',
    haulage: 'Haulage',
    rent: 'Rent',
    buy: 'Buy',
    viewDetails: 'View Details',
    addToCart: 'Add to Cart',
    howItWorks: 'HOW KRISHI SADHAN WORKS?',
    signUpPlatform: 'Sign-up to the platform.',
    postAd: 'Post your ad for the off-season.',
    provideDetails: 'Provide equipment details.',
    exploreFilter: 'Explore and filter lists of equipment.',
    checkAvailability: 'Check an available time slot.',
    chatOwner: 'Chat with the owner and make a booking.',
    stayUpdated: 'Stay updated by SMS.',
    ourServices: 'Our Services',
    askMe: 'Ask me anything about farming!',
    typeMessage: 'Type your message...',
    send: 'Send',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    name: 'Name',
    confirmPassword: 'Confirm Password',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: 'Don\'t have an account?',
    ourCustomers: 'Our Customers',
    satisfiedCustomers: 'Customers are satisfied with our services.',
    latestAcquiredCustomers: 'Latest number of acquired customers.',
    averageEquipmentInvestment: 'Average Equipment Investments'
  },
  kannada: {
    home: 'ಮುಖಪುಟ',
    equipment: 'ಉಪಕರಣಗಳು',
    about: 'ನಮ್ಮ ಬಗ್ಗೆ',
    login: 'ಲಾಗಿನ್',
    signup: 'ಸೈನ್ ಅಪ್',
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    welcome: 'ನಮಸ್ಕಾರ, ಕೃಷಿ ಸಾಧನಕ್ಕೆ ಸುಸ್ವಾಗತ.',
    farmerEquipment: 'ರೈತನ ಉಪಕರಣಗಳು',
    atReasonablePrices: 'ಸಮಂಜಸವಾದ ಮತ್ತು ಕೈಗೆಟುಕುವ ಬೆಲೆಗಳಲ್ಲಿ.',
    startNow: 'ಒಂದೇ ಕ್ಲಿಕ್‌ನೊಂದಿಗೆ ಈಗ ಪ್ರಾರಂಭಿಸಿ.',
    bookNow: 'ಈಗ ಬುಕ್ ಮಾಡಿ',
    whatWeOffer: 'ನಾವು ಏನು ನೀಡುತ್ತೇವೆ',
    beingAPart: 'ಕೃಷಿ ಸಾಧನದ ಭಾಗವಾಗಿರುವುದರಿಂದ, ನೀವು ನಮ್ಮಿಂದ ಪಡೆಯುವುದು ಇದು:',
    customerSupport: '24*7 ಗ್ರಾಹಕ ಬೆಂಬಲ',
    trustedSellers: 'ವಿಶ್ವಾಸಾರ್ಹ ಮಾರಾಟಗಾರರು/ಖರೀದಿದಾರರು',
    oneClickBooking: 'ಒಂದೇ ಕ್ಲಿಕ್ ಬುಕಿಂಗ್',
    tractors: 'ಟ್ರ್ಯಾಕ್ಟರ್‌ಗಳು',
    tillageEquipment: 'ಟಿಲ್ಲೇಜ್ ಉಪಕರಣಗಳು',
    seedingEquipment: 'ಸೀಡಿಂಗ್ ಉಪಕರಣಗಳು',
    landscapeEquipment: 'ಲ್ಯಾಂಡ್‌ಸ್ಕೇಪ್ ಉಪಕರಣಗಳು',
    cropProtection: 'ಬೆಳೆ ರಕ್ಷಣೆ',
    harvestEquipment: 'ಕೊಯ್ಲು ಉಪಕರಣಗಳು',
    postHarvest: 'ಕೊಯ್ಲಿನ ನಂತರ',
    haulage: 'ಸಾಗಣೆ',
    rent: 'ಬಾಡಿಗೆ',
    buy: 'ಖರೀದಿಸಿ',
    viewDetails: 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    addToCart: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
    howItWorks: 'ಕೃಷಿ ಸಾಧನ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ?',
    signUpPlatform: 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗೆ ಸೈನ್-ಅಪ್ ಮಾಡಿ.',
    postAd: 'ಆಫ್-ಸೀಸನ್‌ಗಾಗಿ ನಿಮ್ಮ ಜಾಹೀರಾತನ್ನು ಪೋಸ್ಟ್ ಮಾಡಿ.',
    provideDetails: 'ಉಪಕರಣದ ವಿವರಗಳನ್ನು ಒದಗಿಸಿ.',
    exploreFilter: 'ಉಪಕರಣಗಳ ಪಟ್ಟಿಗಳನ್ನು ಅನ್ವೇಷಿಸಿ ಮತ್ತು ಫಿಲ್ಟರ್ ಮಾಡಿ.',
    checkAvailability: 'ಲಭ್ಯವಿರುವ ಸಮಯದ ಸ್ಲಾಟ್ ಅನ್ನು ಪರಿಶೀಲಿಸಿ.',
    chatOwner: 'ಮಾಲೀಕರೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ ಮತ್ತು ಬುಕಿಂಗ್ ಮಾಡಿ.',
    stayUpdated: 'SMS ಮೂಲಕ ನವೀಕರಿಸಿ.',
    ourServices: 'ನಮ್ಮ ಸೇವೆಗಳು',
    askMe: 'ಕೃಷಿ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ!',
    typeMessage: 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...',
    send: 'ಕಳುಹಿಸಿ',
    email: 'ಇಮೇಲ್',
    password: 'ಪಾಸ್‌ವರ್ಡ್',
    forgotPassword: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?',
    name: 'ಹೆಸರು',
    confirmPassword: 'ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ',
    alreadyHaveAccount: 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?',
    dontHaveAccount: 'ಖಾತೆ ಇಲ್ಲವೇ?',
    ourCustomers: 'ನಮ್ಮ ಗ್ರಾಹಕರು',
    satisfiedCustomers: 'ಗ್ರಾಹಕರು ನಮ್ಮ ಸೇವೆಗಳಿಂದ ತೃಪ್ತರಾಗಿದ್ದಾರೆ.',
    latestAcquiredCustomers: 'ಇತ್ತೀಚೆಗೆ ಪಡೆದ ಗ್ರಾಹಕರ ಸಂಖ್ಯೆ.',
    averageEquipmentInvestment: 'ಸರಾಸರಿ ಉಪಕರಣ ಹೂಡಿಕೆಗಳು'
  }
};

// Create language context
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('english');

  // Set language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'english' || savedLanguage === 'kannada')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
