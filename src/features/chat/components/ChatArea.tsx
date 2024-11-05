// ChatArea.tsx
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
  onBack?: () => void;
}

const ChatHeader = ({ receiver, onBack }: { receiver: any; onBack?: () => void }) => (
  <Box
    sx={{
      mb: 2,
      pb: 1,
      borderBottom: `1px solid ${colors.accent}`,
      display: "flex",
      alignItems: "center",
    }}
  >
    {onBack && (
      <IconButton onClick={onBack} sx={{ mr: 1 }}>
        <ArrowBackIcon />
      </IconButton>
    )}
    <Avatar
      sx={{ mr: 2 }}
      src={receiver?.profileImageUrl}
      alt={receiver?.firstName}
    >
      {receiver?.firstName?.charAt(0)}
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
            : receiver?.firstName?.charAt(0)}
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
          maxWidth: isMobile ? "85%" : "70%",
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
      px: { xs: 1, sm: 2 },
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
  <Box sx={{ display: "flex", mt: "auto", p: { xs: 1, sm: 0 } }}>
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
  onBack,
}: ChatAreaProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!receiver) {
    return (
      <Box sx={{ 
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2 
      }}>
        <Typography
          variant="body1"
          sx={{
            color: colors.text,
          }}
        >
          Select a user to start chatting
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      flexGrow: 1,
      height: '100%',
      width: '100%',
    }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          p: { xs: 1, sm: 2 },
          bgcolor: "white",
          borderRadius: { xs: 0, sm: 2 },
        }}
        elevation={isMobile ? 0 : 1}
      >
        <ChatHeader receiver={receiver} onBack={onBack} />
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