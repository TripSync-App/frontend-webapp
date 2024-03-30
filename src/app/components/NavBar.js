import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  MenuList,
  Typography,
  Avatar,
  Divider,
  Tooltip,
  useMediaQuery,
  createTheme,
  ThemeProvider
} from "@mui/material";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AccountBox, Groups, Logout } from "@mui/icons-material";

export default function NavBarComponent({ logo, pos }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = useMemo(
      () =>
        createTheme({
          palette: {
            mode: prefersDarkMode ? "dark" : "light",
            customBackground: prefersDarkMode ? "#131414" : "#f0ba7d",
            color: prefersDarkMode ? "#FFFFFF": "#000000"
          },
        }),
      [prefersDarkMode],
  );
  let [anchor, setAnchor] = useState(null);
  const router = useRouter();
  const open = Boolean(anchor);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleNavClick = () => {
    router.push("/team");
  };
  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position={pos} sx={{backgroundColor: theme.palette.customBackground, color: theme.palette.color}}>
        <Toolbar sx={{ justifyItems: "right" }}>
          <Avatar
            alt="TripSync"
            src={logo.src}
            sx={{ width: 80, height: 80 }}
          />
          <button
            onClick={() => {
              router.push("/");
            }}
          >
            <text className="text-2xl font-protest">TripSync</text>
          </button>
          <Box sx={{ flexGrow: 1 }} />
          <Divider orientation="vertical" variant="middle" flexItem />
          <span className="w-2" />
          <Tooltip title="Manage Teams">
            <IconButton
              id="team-button"
              color="inherit"
              aria-controls={open ? "team-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleNavClick}
            >
              <Groups fontSize="large"></Groups>
            </IconButton>
          </Tooltip>
          <Tooltip title="Profile">
            <IconButton
              onClick={() => {
                router.push("/profile");
              }}
            >
              <AccountBox fontSize="large"></AccountBox>
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton
              onClick={() => {
                localStorage.clear();
                router.push("/login");
              }}
            >
              <Logout fontSize="large"></Logout>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
  );
}
