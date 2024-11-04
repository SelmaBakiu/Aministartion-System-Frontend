import axios from "axios";
import { io, Socket } from "socket.io-client";
import { API_URL } from "../../../config";

let socket: Socket | null = null;

export interface Message {
  id: string;
  content: string;
  sender: { id: string };
  receiver: { id: string };
  isRead: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export const chatApi = {
  connectSocket: (userId: string) => {
    socket = io(API_URL, {
      query: { userId },
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
      socket.emit("sendMessage", { content, receiverId });
    }
  },

  markAsRead: (messageId: string) => {
    if (socket) {
      socket.emit("markAsRead", messageId);
    }
  },

  getConversation: (senderId: string, receiverId: string) => {
    return axios.get<Message[]>(
      `${API_URL}/chat/conversation/${senderId}/${receiverId}`
    );
  },

  getUnreadCount: () => {
    return axios.get<number>(`${API_URL}/chat/unread`);
  },
};
