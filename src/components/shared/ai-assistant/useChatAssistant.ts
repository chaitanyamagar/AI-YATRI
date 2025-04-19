
import { useState, useRef, useEffect } from 'react';
import { generateTravelResponse } from '../../../services/gemini-api';
import { Message } from './types';

export const useChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI travel assistant. How can I help plan your Maharashtra adventure today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Extract user context from previous messages
  const extractUserContext = () => {
    const context: {
      destination?: string;
      startDate?: string;
      endDate?: string;
      travelers?: number;
      budget?: number;
      transportMode?: string;
      accommodation?: string;
      interests?: string[];
    } = {};
    
    // Simple pattern matching to extract context from conversation
    for (const message of messages) {
      const text = message.text.toLowerCase();
      
      // Extract destination
      const destinationMatch = text.match(/(?:to|in|visit|going to|planning for)\s+([a-z\s]+?)(?:\.|\,|\s+for|\s+on|\s+from|\s+and|\s+with|$)/i);
      if (destinationMatch && destinationMatch[1] && !context.destination) {
        context.destination = destinationMatch[1].trim();
      }
      
      // Extract budget
      const budgetMatch = text.match(/budget(?:\s+of)?\s+(?:₹|rs\.?|inr)?\s*(\d+[,\d]*)/i);
      if (budgetMatch && budgetMatch[1] && !context.budget) {
        context.budget = parseInt(budgetMatch[1].replace(/,/g, ''));
      }
      
      // Extract travelers
      const travelersMatch = text.match(/(\d+)\s+(?:person|people|travelers|travellers|adults|guests)/i);
      if (travelersMatch && travelersMatch[1] && !context.travelers) {
        context.travelers = parseInt(travelersMatch[1]);
      }
      
      // Transport mode
      if (text.includes("flight") || text.includes("fly") || text.includes("plane")) {
        context.transportMode = "flight";
      } else if (text.includes("train")) {
        context.transportMode = "train";
      } else if (text.includes("bus")) {
        context.transportMode = "bus";
      } else if (text.includes("car") || text.includes("driving")) {
        context.transportMode = "car";
      }
      
      // Accommodation
      if (text.includes("hotel")) {
        context.accommodation = "hotel";
      } else if (text.includes("oyo")) {
        context.accommodation = "oyo";
      } else if (text.includes("luxury") || text.includes("5 star")) {
        context.accommodation = "luxury";
      } else if (text.includes("hostel")) {
        context.accommodation = "hostel";
      }
      
      // Interests (can have multiple)
      const interests: string[] = [];
      if (text.includes("adventure") || text.includes("hiking") || text.includes("trekking")) {
        interests.push("adventure");
      }
      if (text.includes("food") || text.includes("cuisine") || text.includes("dining")) {
        interests.push("food");
      }
      if (text.includes("culture") || text.includes("history") || text.includes("museum")) {
        interests.push("culture");
      }
      if (text.includes("relaxation") || text.includes("relax") || text.includes("peaceful")) {
        interests.push("relaxation");
      }
      
      if (interests.length > 0 && !context.interests) {
        context.interests = interests;
      }
    }
    
    return context;
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Extract context from previous messages
      const userContext = extractUserContext();
      
      // Get AI response using Gemini API
      const aiResponseText = await generateTravelResponse(inputMessage, userContext);
      
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      // Fallback message in case of error
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I'm sorry, I'm having trouble connecting to my travel database. Please try again later.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return {
    isOpen,
    isMinimized,
    inputMessage,
    messages,
    isLoading,
    messagesEndRef,
    toggleOpen,
    toggleMinimize,
    handleSendMessage,
    handleKeyPress,
    setInputMessage
  };
};
