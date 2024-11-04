import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { colors } from "../../styles/colors";
import storage from "../../utils/storage";

function Navbar({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate();
  const handleLogout = useLogout();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const currentUser = storage.getUser().user;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: colors.secondary,
        color: colors.background,
        border: `2px solid ${colors.primary}`,
      }}
    >
      <Container>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              fontFamily: "Roboto, sans-serif",
              fontWeight: 700,
              color: colors.background,
              "&:hover": {
                color: colors.primary,
                transition: "color 0.3s ease",
              },
            }}
            onClick={() => navigate("/")}
          >
            Admistation-System
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            {children}
            {currentUser.role === "administrator" && (
              <Button
                onClick={() => navigate("employee")}
                sx={{
                  mx: 1,
                  color: colors.background,
                  "&:hover": {
                    backgroundColor: colors.primary,
                    color: colors.background,
                    transition: "all 0.3s ease",
                  },
                }}
              >
                Profile
              </Button>
            )}
            <Button
              sx={{
                mx: 1,
                color: "#fff",
                "&:hover": {
                  backgroundColor: colors.primary,
                  color: "#000",
                },
              }}
              onClick={() => navigate("/chat")}
            >
              Chat
            </Button>
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                mx: 1,
                color: colors.primary,
                borderColor: colors.primary,
                "&:hover": {
                  backgroundColor: colors.primary,
                  color: colors.background,
                  borderColor: colors.primary,
                  transition: "all 0.3s ease",
                },
              }}
            >
              Log Out
            </Button>
          </Box>

          <IconButton
            sx={{
              display: { xs: "flex", md: "none" },
              color: colors.background,
              "&:hover": {
                color: colors.primary,
              },
            }}
            edge="start"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                bgcolor: colors.background,
                "& .MuiMenuItem-root": {
                  color: colors.text,
                  "&:hover": {
                    bgcolor: colors.accent,
                  },
                },
              },
            }}
          >
            {children}
            <MenuItem
              onClick={() => {
                navigate("employee");
                handleClose();
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/chat");
                handleClose();
              }}
            >
              Chat
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleLogout();
                handleClose();
              }}
            >
              Log Out
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
