// UsersList.tsx
import { List, ListItem, ListItemText, Avatar, Typography, Box } from "@mui/material";
import { colors } from "../../../styles/colors";
import { Employee } from "../../employee/types";

interface UsersListProps {
  users: Employee[] | undefined;
  currentUserId: string;
  selectedUserId: string;
  onUserSelect: (userId: string) => void;
}

const UsersList = ({
  users,
  currentUserId,
  selectedUserId,
  onUserSelect,
}: UsersListProps) => {
  const filteredUsers = Array.isArray(users) ? users.filter((user) => user.id !== currentUserId) : [];
  
  return (
    <List
      sx={{
        height: '100%',
        width: '100%',
        borderRight: { xs: 'none', sm: `1px solid ${colors.accent}` },
        bgcolor: colors.background,
        borderRadius: { xs: 0, sm: 1 },
        overflowY: "auto",
        p: 0,
      }}
    >
      <Box sx={{ p: 2, borderBottom: `1px solid ${colors.accent}` }}>
        <Typography variant="h6" sx={{ color: colors.text }}>
          Chats
        </Typography>
      </Box>
      {filteredUsers.map((user) => (
        <ListItem
          key={user.id}
          onClick={() => onUserSelect(user.id)}
          sx={{
            cursor: "pointer",
            py: 2,
            borderBottom: `1px solid ${colors.accent}`,
            backgroundColor:
              selectedUserId === user.id ? colors.accent : "transparent",
            color: colors.text,
            "&:hover": {
              backgroundColor: colors.accent,
              transition: "background-color 0.2s ease",
            },
          }}
        >
          <Avatar
            sx={{ mr: 2 }}
            src={user.profileImageUrl}
            alt={`${user.firstName} ${user.lastName}`}
          >
            {user.firstName.charAt(0)}
          </Avatar>
          <ListItemText 
            primary={`${user.firstName} ${user.lastName}`}
            sx={{
              '& .MuiListItemText-primary': {
                fontWeight: 500,
              }
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default UsersList;