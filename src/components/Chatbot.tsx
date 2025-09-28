import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Skouce assistant. How can I help you find the perfect watch today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "Our watches range from ₹1,34,999 to ₹4,19,999. We also offer EMI options and special financing for premium pieces. Would you like to know about a specific watch?";
    }
    
    if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
      return "We offer free shipping on orders above ₹75,000. Standard delivery takes 3-5 business days, and express delivery is available for urgent orders. All watches come with secure packaging and insurance.";
    }
    
    if (lowerMessage.includes('warranty') || lowerMessage.includes('guarantee')) {
      return "All our watches come with manufacturer warranty ranging from 2-5 years depending on the brand. We also provide authenticity certificates and after-sales service support.";
    }
    
    if (lowerMessage.includes('luxury') || lowerMessage.includes('premium')) {
      return "Our luxury collection features premium brands with Swiss movements, precious metals, and limited editions. Would you like me to show you our Royal Heritage or Luxury Crown collections?";
    }
    
    if (lowerMessage.includes('sport') || lowerMessage.includes('fitness')) {
      return "Our sports collection includes water-resistant, shock-proof watches perfect for active lifestyles. The Sport Elite series is particularly popular among fitness enthusiasts.";
    }
    
    if (lowerMessage.includes('gift') || lowerMessage.includes('present')) {
      return "Watches make excellent gifts! We offer premium gift wrapping, personalized engraving services, and gift cards. Would you like recommendations based on the recipient's style?";
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! Welcome to Skouce. I'm here to help you discover the perfect timepiece. Are you looking for something specific today?";
    }
    
    if (lowerMessage.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with regarding our watch collections or services?";
    }
    
    // Default responses
    const defaultResponses = [
      "That's a great question! Let me help you with that. Could you provide more details about what you're looking for?",
      "I'd be happy to assist you with that. Are you interested in a particular style or brand of watch?",
      "Thank you for your interest in Skouce. Would you like me to connect you with one of our watch specialists for personalized assistance?",
      "I can help you find the perfect watch. What's your budget range and preferred style?",
      "Our collection includes luxury, sport, classic, and smart watches. Which category interests you most?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-violet-600 hover:bg-violet-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 group"
      >
        <MessageCircle className="h-6 w-6" />
        <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
          1
        </div>
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Need help? Chat with us!
        </div>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-80 h-96'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-violet-800 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Skouce Assistant</h3>
            <p className="text-xs opacity-90">Online now</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <Minimize2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <div className={`p-2 rounded-full ${
                    message.sender === 'user' 
                      ? 'bg-violet-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-3 w-3" />
                    ) : (
                      <Bot className="h-3 w-3" />
                    )}
                  </div>
                  <div className={`p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-violet-600 text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-violet-200' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="p-2 rounded-full bg-gray-200 text-gray-700">
                    <Bot className="h-3 w-3" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;