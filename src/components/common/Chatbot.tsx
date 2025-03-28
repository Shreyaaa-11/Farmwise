
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: t('askMe'),
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate API call to farming knowledge base
    setTimeout(() => {
      // Mock responses based on keywords
      let botResponse = "I'm not sure about that. Can you please ask something related to farming equipment or crops?";
      
      const lowerCaseMsg = inputMessage.toLowerCase();
      
      if (lowerCaseMsg.includes('tractor')) {
        botResponse = "Tractors are essential farming equipment. We offer various tractor models for rent and purchase, ranging from 20 HP to 75 HP. For small farms, 20-35 HP tractors are ideal, while larger operations benefit from 45-75 HP models.";
      } else if (lowerCaseMsg.includes('seed') || lowerCaseMsg.includes('planting')) {
        botResponse = "For seeding equipment, we have seed drills, planters, and broadcasters available. Modern seed drills can help you achieve uniform seed placement and better germination rates.";
      } else if (lowerCaseMsg.includes('harvest')) {
        botResponse = "Our harvest equipment includes combine harvesters, threshers, and reapers. Combine harvesters are excellent for wheat, rice, and other grain crops, significantly reducing harvest time.";
      } else if (lowerCaseMsg.includes('rice') || lowerCaseMsg.includes('paddy')) {
        botResponse = "For rice cultivation, we recommend our specialized rice transplanters, paddy weeders, and rice combine harvesters. The ideal time for planting rice depends on your region, but it generally requires consistent water supply.";
      } else if (lowerCaseMsg.includes('wheat')) {
        botResponse = "Wheat farming requires proper seed drills, fertilizer applicators, and harvest equipment. Our wheat combine harvesters can handle 1-2 acres per hour, making harvesting efficient.";
      } else if (lowerCaseMsg.includes('rent') || lowerCaseMsg.includes('price')) {
        botResponse = "Our rental prices vary based on equipment type and duration. Tractors start at ₹800/day, while specialized equipment like combine harvesters range from ₹1500-3000/day. For exact pricing, please check the equipment details page.";
      } else if (lowerCaseMsg.includes('soil') || lowerCaseMsg.includes('fertilizer')) {
        botResponse = "For soil preparation, we offer tillers, cultivators, and disc harrows. When applying fertilizers, our precision applicators can help optimize your input costs while maximizing yield.";
      }

      const botMessageObj: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessageObj]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-panel animate-fade-in">
          <div className="chatbot-header">
            <h3 className="font-medium">Farming Assistant</h3>
            <button onClick={toggleChatbot} className="text-white hover:text-gray-200">
              <X size={18} />
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div 
                  className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                    message.sender === 'user' 
                      ? 'bg-krishi-primary text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="text-left mb-4">
                <div className="inline-block bg-gray-100 rounded-lg px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input">
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('typeMessage')}
              className="flex-1 bg-transparent border-none outline-none"
            />
            <Button 
              onClick={handleSendMessage} 
              size="sm"
              variant="ghost"
              className="text-krishi-primary hover:text-krishi-dark hover:bg-transparent"
              disabled={!inputMessage.trim() || isLoading}
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      )}
      
      <button 
        onClick={toggleChatbot} 
        className="chatbot-button"
        aria-label="Toggle chat"
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

export default Chatbot;
