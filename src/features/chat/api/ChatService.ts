// src/chat/api/chatApi.ts
import axios from 'axios';
import { io, Socket } from 'socket.io-client';

const API_URL = 'http://localhost:3000';
let socket: Socket | null = null;

export interface Message {
  id: string;
  content: string;
  sender: string; 
  receiver: string; 
  isRead: boolean;
  createdAt: Date;
}

export const chatApi = {
  connectSocket: (userId: string) => {
    socket = io(API_URL, {
      query: { userId }
    });
    return socket;
  },

  disconnectSocket: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },

  sendMessage: (content: string, receiverId: string) => {
    if (socket) {
      socket.emit('sendMessage', { content, receiverId });
    }
  },

  markAsRead: (messageId: string) => {
    if (socket) {
      socket.emit('markAsRead', messageId);
    }
  },

  getConversation: (receiverId: string, page: number = 0, limit: number = 20) => {
    return axios.get<Message[]>(`${API_URL}/chat/conversation/${receiverId}`, {
      params: { page, limit }
    });
  },

  getUnreadCount: () => {
    return axios.get<number>(`${API_URL}/chat/unread`);
  }
};