import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BarChart3, TrendingUp, Cloud, Sprout } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  chartData?: any;
}

interface ChatHistoryProps {
  messages: Message[];
}

const getTopicIcon = (content: string) => {
  const lowerContent = content.toLowerCase();
  if (lowerContent.includes('price')) return <TrendingUp className="h-4 w-4" />;
  if (lowerContent.includes('weather')) return <Cloud className="h-4 w-4" />;
  if (lowerContent.includes('fertilizer')) return <Sprout className="h-4 w-4" />;
  return <BarChart3 className="h-4 w-4" />;
};

const getTopicFromContent = (content: string): string => {
  const lowerContent = content.toLowerCase();
  if (lowerContent.includes('price') && lowerContent.includes('wheat')) return 'Wheat Prices';
  if (lowerContent.includes('price')) return 'Crop Prices';
  if (lowerContent.includes('weather')) return 'Weather Forecast';
  if (lowerContent.includes('fertilizer')) return 'Fertilizer Advice';
  return 'General Inquiry';
};

export const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  // Get unique conversation topics from user messages
  const conversationTopics = messages
    .filter(msg => msg.type === 'user')
    .map(msg => ({
      id: msg.id,
      topic: getTopicFromContent(msg.content),
      icon: getTopicIcon(msg.content),
      timestamp: msg.timestamp,
      preview: msg.content.substring(0, 50) + (msg.content.length > 50 ? '...' : ''),
    }))
    .slice(-5); // Show last 5 conversations

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <h3 className="mb-4 text-sm font-semibold">Recent Conversations</h3>
      
      <div className="space-y-2">
        {conversationTopics.length === 0 ? (
          <Card className="p-3">
            <p className="text-xs text-muted-foreground text-center">
              No conversations yet. Start chatting to see your history!
            </p>
          </Card>
        ) : (
          conversationTopics.map((topic) => (
            <Card key={topic.id} className="p-3 cursor-pointer transition-colors hover:bg-secondary/50">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 rounded-full bg-primary/10 p-2">
                  {topic.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{topic.topic}</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {topic.preview}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {topic.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
      
      <div className="mt-6">
        <h4 className="mb-3 text-sm font-semibold">Quick Actions</h4>
        <div className="space-y-2">
          <Card className="p-3 cursor-pointer transition-colors hover:bg-secondary/50">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm">Check Crop Prices</span>
            </div>
          </Card>
          <Card className="p-3 cursor-pointer transition-colors hover:bg-secondary/50">
            <div className="flex items-center space-x-3">
              <Cloud className="h-4 w-4 text-primary" />
              <span className="text-sm">Weather Forecast</span>
            </div>
          </Card>
          <Card className="p-3 cursor-pointer transition-colors hover:bg-secondary/50">
            <div className="flex items-center space-x-3">
              <Sprout className="h-4 w-4 text-primary" />
              <span className="text-sm">Farming Tips</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};