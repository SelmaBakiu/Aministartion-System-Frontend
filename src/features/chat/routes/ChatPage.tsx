import { useState, useEffect, useRef } from "react";
import { Box, Grid } from "@mui/material";
import storage from "../../../utils/storage";
import { chatApi, Message } from "../api/ChatService";
import { useGetContacts } from "../api/getContacts";
import ChatArea from "../components/ChatArea";
import UsersList from "../components/UsersList";

export const ChatPage = () => {
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
          console.error("Failed to fetch conversation:", error);
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        p: 2,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 1,
        height: "80vh",
        maxWidth: "1200px",

      }}
    >
       <Grid item xs={3}>
        <UsersList
          users={users?.data}
          currentUserId={currentUser.id.toString()}
          selectedUserId={receiverId}
          onUserSelect={setReceiverId}
        />
      </Grid>
      <ChatArea
        receiver={Array.isArray(users?.data) ? users.data.find((user) => user.id === receiverId) : undefined}
        currentUser={currentUser}
        messages={messages}
        isLoading={isLoading}
        newMessage={newMessage}
        onNewMessageChange={setNewMessage}
        onSendMessage={handleSendMessage}
        messagesEndRef={messagesEndRef}
      />
    </Box>
  );
};

export default ChatPage;
