import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import { colors } from "../../../styles/colors";
import { Message } from "../api/ChatService";
import { User } from "../../../types/auth.types";

interface ChatAreaProps {
  receiver: any;
  currentUser: User;
  messages: Message[];
  isLoading: boolean;
  newMessage: string;
  onNewMessageChange: (message: string) => void;
  onSendMessage: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatHeader = ({ receiver }: { receiver: any }) => (
  <Box
    sx={{
      mb: 2,
      pb: 1,
      borderBottom: `1px solid ${colors.accent}`,
      display: "flex",
      alignItems: "center",
    }}
  >
    <Avatar
      sx={{ mr: 2 }}
      src={receiver?.profileImageUrl}
      alt={receiver?.firstName}
    >
      {receiver?.firstName.charAt(0)}
    </Avatar>
    <Typography variant="h6" sx={{ color: colors.text }}>
      {receiver?.firstName} {receiver?.lastName}
    </Typography>
  </Box>
);

const MessageItem = ({
  message,
  isCurrentUserMessage,
  currentUser,
  receiver,
}: {
  message: any;
  isCurrentUserMessage: boolean;
  currentUser: any;
  receiver: any;
}) => {
  const messageTime = new Date(message.createdAt).toLocaleTimeString();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: isCurrentUserMessage ? "flex-end" : "flex-start",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isCurrentUserMessage ? "row-reverse" : "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar
          sx={{ width: 24, height: 24 }}
          src={
            isCurrentUserMessage
              ? currentUser.profileImageUrl
              : receiver?.profileImageUrl
          }
          alt={
            isCurrentUserMessage ? currentUser.firstName : receiver?.firstName
          }
        >
          {isCurrentUserMessage
            ? currentUser.firstName.charAt(0)
            : receiver?.firstName.charAt(0)}
        </Avatar>
        <Typography
          variant="caption"
          sx={{
            color: colors.text,
            opacity: 0.7,
          }}
        >
          {isCurrentUserMessage ? "You" : receiver?.firstName}
        </Typography>
      </Box>

      <Typography
        variant="body2"
        sx={{
          mt: 1,
          p: 1.5,
          px: 2,
          borderRadius: "20px",
          maxWidth: "70%",
          wordBreak: "break-word",
          backgroundColor: isCurrentUserMessage
            ? colors.primary
            : colors.secondary,
          color: "white",
        }}
      >
        {message.content}
      </Typography>

      <Typography
        variant="caption"
        sx={{
          mt: 0.5,
          color: colors.text,
          opacity: 0.7,
        }}
      >
        {messageTime}
      </Typography>
    </Box>
  );
};

const MessagesList = ({
  messages,
  isLoading,
  currentUser,
  receiver,
  messagesEndRef,
}: {
  messages: any[];
  isLoading: boolean;
  currentUser: any;
  receiver: any;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}) => (
  <Box
    sx={{
      flexGrow: 1,
      overflowY: "auto",
      position: "relative",
      px: 2,
    }}
  >
    {isLoading ? (
      <Typography align="center">Loading messages...</Typography>
    ) : messages.length === 0 ? (
      <Typography align="center">No messages yet</Typography>
    ) : (
      messages.map((msg, index) => (
        <MessageItem
          key={index}
          message={msg}
          isCurrentUserMessage={msg.sender.id === currentUser.id.toString()}
          currentUser={currentUser}
          receiver={receiver}
        />
      ))
    )}
    <div ref={messagesEndRef} />
  </Box>
);

const MessageInput = ({
  newMessage,
  onNewMessageChange,
  onSendMessage,
}: {
  newMessage: string;
  onNewMessageChange: (message: string) => void;
  onSendMessage: () => void;
}) => (
  <Box sx={{ display: "flex", mt: "auto"}}>
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Type a message..."
      value={newMessage}
      onChange={(e) => onNewMessageChange(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          onSendMessage();
        }
      }}
      multiline
      maxRows={2}
      sx={{
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: colors.primary,
          },
        },
      }}
    />
    <Button
      variant="contained"
      disabled={!newMessage.trim()}
      sx={{
        ml: 1,
        bgcolor: colors.primary,
        "&:hover": {
          bgcolor: colors.primary + "dd",
        },
      }}
      onClick={onSendMessage}
    >
      Send
    </Button>
  </Box>
);

const ChatArea = ({
  receiver,
  currentUser,
  messages,
  isLoading,
  newMessage,
  onNewMessageChange,
  onSendMessage,
  messagesEndRef,
}: ChatAreaProps) => {
  if (!receiver) {
    return (
      <Box sx={{ ml: 2, flexGrow: 1 }}>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            mt: 4,
            color: colors.text,
          }}
        >
          Select a user to start chatting
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ ml: 2, display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "95%",
          p: 2,
          bgcolor: "white",
          borderRadius: 2,
        }}
      >
        <ChatHeader receiver={receiver} />
        <MessagesList
          messages={messages}
          isLoading={isLoading}
          currentUser={currentUser}
          receiver={receiver}
          messagesEndRef={messagesEndRef}
        />
        <MessageInput
          newMessage={newMessage}
          onNewMessageChange={onNewMessageChange}
          onSendMessage={onSendMessage}
        />
      </Paper>
    </Box>
  );
};

export default ChatArea;
