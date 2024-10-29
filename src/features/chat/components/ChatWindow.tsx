// src/chat/components/ChatWindow.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Message, chatApi } from '../api/ChatService';
import { ChatMessage } from './ChatMessage';

interface Props {
  receiverId: string;
  currentUserId: string;
}

export const ChatWindow: React.FC<Props> = ({ receiverId, currentUserId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socket = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Connect to socket
    socket.current = chatApi.connectSocket(currentUserId);

    // Load initial messages
    loadMessages();

    // Listen for new messages
    socket.current.on('newMessage', (message: Message) => {
      setMessages(prev => [...prev, message]);
      chatApi.markAsRead(message.id);
      scrollToBottom();
    });

    return () => {
      chatApi.disconnectSocket();
    };
  }, [receiverId]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await chatApi.getConversation(receiverId);
      
      // Ensure we have an array and sort it by date
      let messageArray = Array.isArray(response.data) ? response.data : [];
      messageArray = messageArray.sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      
      setMessages(messageArray);
      scrollToBottom();
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      chatApi.sendMessage(newMessage, receiverId);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-window">
      <div className="messages-container">
        {loading ? (
          <div className="loading">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="no-messages">No messages yet</div>
        ) : (
          messages.map(message => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              currentUserId={currentUserId} 
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};