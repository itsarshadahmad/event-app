import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

export default function Navbar({ navButtonPage }) {
    if (!navButtonPage) {
        navButtonPage = "signin";
    }

    const [isAuth, setIsAuth] = useState(false);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token) {
            setIsAuth(true);
        }
    }, [token]);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: "flex",
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Event
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        {!isAuth && (
                            <>
                                <Button
                                    key={navButtonPage}
                                    variant="outline"
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: "primary.main",
                                        bgcolor: "white",
                                        mx: 1,
                                        display: "block",
                                        ":hover": {
                                            bgcolor: "whitesmoke",
                                        },
                                    }}
                                    component="a"
                                    href={navButtonPage}
                                >
                                    {navButtonPage}
                                </Button>
                            </>
                        )}
                    </Box>

                    {isAuth && (
                        <>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt="User"
                                            src="/static/images/avatar/2.jpg"
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem
                                        key={1}
                                        onClick={handleCloseUserMenu}
                                    >
                                        <Link to={`/new-event`}>New Event</Link>
                                    </MenuItem>

                                    <MenuItem
                                        key={2}
                                        onClick={handleCloseUserMenu}
                                    >
                                        <Link to={`/dashboard`}>Dashboard</Link>
                                    </MenuItem>

                                    <MenuItem
                                        key={3}
                                        onClick={handleCloseUserMenu}
                                    >
                                        <Link to={`/logout`}>Logout</Link>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
