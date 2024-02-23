import { AppBar, Box, Toolbar, IconButton, Button, Menu, MenuItem, MenuList, Typography, Avatar } from "@mui/material";
import { useState } from "react";


export default function NavBarComponent({logo}) {
    let [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);
    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    };
    const handleClose = () => {
        setAnchor(null);
    };



    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="fixed">
                <Toolbar sx={{ justifyItems: "right"}}>
                    <Avatar alt="TripSync" src={logo}/>
                    <Box sx={{flexGrow: 1}}/>
                    <Button
                        id="team-button"
                        color="inherit"
                        aria-controls={open ? "team-menu": undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Teams
                    </Button>
                    <Menu
                        id='team-menu'
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
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}