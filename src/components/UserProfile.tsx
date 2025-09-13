import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import userAvatar from '@/assets/user-avatar.png';

export const UserProfile: React.FC = () => {
  return (
    <Card className="m-4 p-4">
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={userAvatar} alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold truncate">Farmer John</h3>
          <p className="text-xs text-muted-foreground truncate">Punjab, India</p>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-3 text-center">
        <div className="rounded-lg bg-secondary/50 p-2">
          <p className="text-lg font-semibold text-primary">12</p>
          <p className="text-xs text-muted-foreground">Chats</p>
        </div>
        <div className="rounded-lg bg-secondary/50 p-2">
          <p className="text-lg font-semibold text-primary">8</p>
          <p className="text-xs text-muted-foreground">Reports</p>
        </div>
      </div>
    </Card>
  );
};