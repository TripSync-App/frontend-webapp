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
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AccountBox, Groups } from "@mui/icons-material";

export default function NavBarComponent({ logo, pos }) {
  let [anchor, setAnchor] = useState(null);
  const router = useRouter();
  const open = Boolean(anchor);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const theme = useTheme();
  const handleNavClick = () => {
    router.push("/team");
  };
  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position={pos}>
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
            <text className="text-2xl">TripSync</text>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
