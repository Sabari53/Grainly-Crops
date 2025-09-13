import React, { useState, useRef, useEffect } from 'react';
import { Send, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PriceChart } from './PriceChart';
import { UserProfile } from './UserProfile';
import { ChatHistory } from './ChatHistory';
import grainlyBot from '@/assets/grainly-bot.png';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  chartData?: any;
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'bot',
    content: 'Welcome to Grainly Crops! I\'m your farming assistant. Ask me about crop prices, weather forecasts, or farming tips.',
    timestamp: new Date(),
  }
];

export const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate bot response with chart data for wheat price queries
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputValue),
        timestamp: new Date(),
        chartData: inputValue.toLowerCase().includes('price') ? generateChartData(inputValue) : undefined,
      };

      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('price') && input.includes('wheat')) {
      return "Here's the projected price trend for wheat for the next three months, with anticipated peak in June.";
    } else if (input.includes('price')) {
      return "I can help you with crop price predictions. Which crop and region are you interested in?";
    } else if (input.includes('weather')) {
      return "Current weather conditions look favorable for farming. Would you like a detailed forecast for your region?";
    } else if (input.includes('fertilizer')) {
      return "For optimal crop growth, I recommend using organic fertilizers. Would you like specific recommendations based on your crop type?";
    } else {
      return "I'm here to help with farming advice, crop prices, weather updates, and agricultural best practices. What would you like to know?";
    }
  };

  const generateChartData = (userInput: string) => {
    return {
      title: "Wheat Price Prediction - Punjab - Q2 2024",
      data: [
        { month: 'Apr', price: 1800 },
        { month: 'May', price: 2100 },
        { month: 'Jun', price: 2650 },
        { month: 'Jul', price: 2850 },
      ],
      currency: '₹',
      source: 'Agronomic Data Systems'
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-chat-background">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:w-80 lg:flex-col lg:border-r lg:border-border">
        <UserProfile />
        <ChatHistory messages={messages} />
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:px-6">
          <div className="flex items-center space-x-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <UserProfile />
                <ChatHistory messages={messages} />
              </SheetContent>
            </Sheet>
            
            <Avatar className="h-10 w-10">
              <AvatarImage src={grainlyBot} alt="Grainly Crops" />
              <AvatarFallback>GC</AvatarFallback>
            </Avatar>
            
            <div>
              <h1 className="text-lg font-semibold">Grainly Crops</h1>
              <p className="text-sm text-muted-foreground">Your Farming Assistant</p>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="mx-auto max-w-4xl space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-user-bubble text-white'
                      : 'bg-bot-bubble'
                  }`}
                >
                  {message.type === 'bot' && (
                    <div className="mb-2 flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={grainlyBot} alt="Bot" />
                        <AvatarFallback>B</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">Grainly Crops</span>
                    </div>
                  )}
                  
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  
                  {message.chartData && (
                    <div className="mt-4">
                      <Card className="p-4">
                        <PriceChart data={message.chartData} />
                      </Card>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl bg-bot-bubble px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={grainlyBot} alt="Bot" />
                      <AvatarFallback>B</AvatarFallback>
                    </Avatar>
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-border bg-card p-4 lg:p-6">
          <div className="mx-auto max-w-4xl">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message Grainly Crops..."
                className="flex-1 rounded-full"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="sm"
                className="rounded-full px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};