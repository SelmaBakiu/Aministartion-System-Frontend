// ChatPage.tsx
import { useState, useEffect, useRef } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import storage from "../../../utils/storage";
import { chatApi, Message } from "../api/ChatService";
import { useGetContacts } from "../api/getContacts";
import ChatArea from "../components/ChatArea";
import UsersList from "../components/UsersList";

export const ChatPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showUsersList, setShowUsersList] = useState(!isMobile);
  const [receiverId, setReceiverId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = storage.getUser().user;
  const users = useGetContacts();
  const socketRef = useRef<any>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socketRef.current = chatApi.connectSocket(currentUser.id.toString());

    socketRef.current.on("newMessage", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    return () => {
      chatApi.disconnectSocket();
    };
  }, [currentUser.id]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (receiverId) {
        setIsLoading(true);
        try {
          const response = await chatApi.getConversation(
            currentUser.id.toString(),
            receiverId
          );
          const sortedMessages = response.data.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          setMessages(sortedMessages);
        } catch (error) {
          console.error("Failed to fetch messages:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMessages();
  }, [receiverId, currentUser.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && receiverId) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: { id: currentUser.id.toString() },
        receiver: { id: receiverId },
        isRead: false,
        createdAt: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, message]);
      chatApi.sendMessage(newMessage, receiverId);
      setNewMessage("");
      scrollToBottom();
    }
  };

  const toggleView = () => {
    setShowUsersList(!showUsersList);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        p: { xs: 0, sm: 2 },
        bgcolor: "white",
        borderRadius: { xs: 0, sm: 2 },
        boxShadow: 1,
        height: { xs: '100vh', sm: '80vh' },
        maxWidth: "1200px",
        overflow: 'hidden',
        margin: { xs: 0, sm: 'auto' },
      }}
    >
      {(!isMobile || (isMobile && showUsersList)) && (
        <Box
          sx={{
            width: { xs: '100%', sm: '300px' },
            flexShrink: 0,
            height: '100%',
          }}
        >
          <UsersList
            users={users?.data}
            currentUserId={currentUser.id.toString()}
            selectedUserId={receiverId}
            onUserSelect={(userId) => {
              setReceiverId(userId);
              if (isMobile) {
                setShowUsersList(false);
              }
            }}
          />
        </Box>
      )}

      {(!isMobile || (isMobile && !showUsersList)) && (
        <ChatArea
          receiver={Array.isArray(users?.data) ? users.data.find((user) => user.id === receiverId) : undefined}
          currentUser={currentUser}
          messages={messages}
          isLoading={isLoading}
          newMessage={newMessage}
          onNewMessageChange={setNewMessage}
          onSendMessage={handleSendMessage}
          messagesEndRef={messagesEndRef}
          onBack={isMobile ? toggleView : undefined}
        />
      )}
    </Box>
  );
};

export default ChatPage;