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
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NavBarComponent({ logo, pos }) {
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
          <Button
            id="team-button"
            color="inherit"
            aria-controls={open ? "team-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleNavClick}
            sx={{ height: 75 }}
          >
            Teams
          </Button>
          <Menu
            id="team-menu"
            anchorEl={anchor}
            open={open}
            onClose={handleClose}
          >
            <MenuList dense>
              <MenuItem onClick={handleClose}>Manage Team Members</MenuItem>
              <MenuItem onClick={handleClose}>Show Team Members</MenuItem>
              <MenuItem onClick={handleClose}>Invite Team Member</MenuItem>
            </MenuList>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
