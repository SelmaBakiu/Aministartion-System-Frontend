
import React from 'react';
import { Message } from '../api/ChatService';

interface Props {
  message: Message;
  currentUserId: string;
}

export const ChatMessage: React.FC<Props> = ({ message, currentUserId }) => {
  const isOwnMessage = message.sender === currentUserId;

  return (
    <div className={`message ${isOwnMessage ? 'message-own' : 'message-other'}`}>
      <div className="message-content">
        <p>{message.content}</p>
        <small>{new Date(message.createdAt).toLocaleTimeString()}</small>
      </div>
    </div>
  );
};
