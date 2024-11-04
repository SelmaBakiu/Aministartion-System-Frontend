import { List, ListItem, ListItemText, Avatar } from "@mui/material";
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
        width: "300px",
        borderRight: `1px solid ${colors.accent}`,
        bgcolor: colors.background,
        borderRadius: 1,
        overflowY: "auto",
      }}
    >
      {filteredUsers.map((user) => (
        <ListItem
          key={user.id}
          onClick={() => onUserSelect(user.id)}
          sx={{
            cursor: "pointer",
            mb: 0.5,
            borderRadius: 1,
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
          <ListItemText primary={`${user.firstName} ${user.lastName}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default UsersList;
