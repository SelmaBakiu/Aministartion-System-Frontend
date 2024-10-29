
import React, { useState, useEffect } from 'react';
import { ChatWindow } from '../components/ChatWindow';
import { chatApi } from '../api/ChatService';
import storage from '../../../utils/storage';

export const ChatPage2: React.FC = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const currentUserId = storage.getUser().user.id;
  

  useEffect(() => {
    const loadUnreadCount = async () => {
      const response = await chatApi.getUnreadCount();
      setUnreadCount(response.data);
    };
    loadUnreadCount();
  }, []);


  return (
    <div className="chat-page">
      <div className="chat-header">
        <h2>Chat</h2>
        {unreadCount > 0 && (
          <span className="unread-badge">{unreadCount}</span>
        )}
      </div>
      <ChatWindow 
        receiverId={"cb98a0a0-e369-488b-9509-3e6276776a74"}
        currentUserId={currentUserId.toString()}
      />
    </div>
  );
};