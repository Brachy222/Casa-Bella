import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ShoppingCart } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, useTheme, ThemeProvider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { badgeClasses } from '@mui/material/Badge';

import "../styles/NavBar.css";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -20px;
  }
`;

const NavBar = (props) => {

    const { categoties, theme } = props;
    // const user = JSON.parse(localStorage.getItem("user"));
    const user = useSelector((state) => state.user.currentUser);
    console.log("משתמש נוכחי", user);
    const countCart = useSelector((state) => state.cart.count);
    console.log("count product in cart: ",countCart);
    return (
        <>
            <nav className="nav-bar">
                {console.log(categoties)}
                <div id="navbarCategories">
                    <ul>
                    <li key={"home"} className="navDiv">
                       <Link to="/home">
                           <img src="../images/logo.svg" alt="לוגו" style={{ width: '80px', height: 'auto' ,marginRight: '3px'}} />
                       </Link>
                   </li>

                        {/* <li key={"all"} className="navDiv">
                            <Link to="/products">כל המוצרים</Link>
                        </li> */}
                        {Object.entries(categoties).map(([key, value]) => (
                            <li key={key} className="navDiv">
                                <Link to={`/${key}`}>{value }</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div id="privateArea">
                    

                    {user ? (
                        <>
                            <span>שלום, {user?.userName || "אורח"}</span>
                            <Link to="/logout">יציאה</Link>
                        </>
                    ) : (
                        <>
                            <span>שלום, אורח</span>
                            <Link to="/login">כניסה</Link>
                            <Link to="/signUp">הרשמה</Link>
                        </>
                    )}
                    {user && user.role === "admin" && (
                        <>
                            <Link to="/add">הוספה</Link>
                            {/* <Link to="/update">עדכון</Link> */}
                        </>
                    )}
                    {/* {user && <Link to="/order">  סיום הזמנה </Link>} */}
                    {/* <Link to="/cart">
                        <ShoppingCart style={{ color: "black" }} />
                    </Link> */}
                    <Link to="/cart" style={{ textDecoration: 'none' }}>
                    <IconButton>
                        <ShoppingCartIcon fontSize="small" />
                        <CartBadge badgeContent={countCart} color="warning" overlap="circular" />
                    </IconButton>
                        {/* <IconButton>
                            <ShoppingCartIcon fontSize="small" />
                            <Badge badgeContent={countCart} sx={{ bgcolor: theme.palette.brown }} overlap="circular" />
                        </IconButton> */}
                    </Link>

                    
                </div>
            </nav>
        </>
    );
};

export default NavBar;

// import * as React from 'react';
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { ShoppingCart } from "@mui/icons-material";
// import IconButton from '@mui/material/IconButton';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import { Badge, AppBar, Box, Toolbar, Typography, Container, Menu, MenuItem, Tooltip, Avatar } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { styled } from '@mui/material/styles';
// import { badgeClasses } from '@mui/material/Badge';

// const CartBadge = styled(Badge)`
//   & .${badgeClasses.badge} {
//     top: -12px;
//     right: -20px;
//   }
// `;

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// const NavBar = (props) => {
//     const { categoties } = props;
//     const user = useSelector((state) => state.user.currentUser);
//     const countCart = useSelector((state) => state.cart.count);

//     const [anchorElNav, setAnchorElNav] = React.useState(null);
//     const [anchorElUser, setAnchorElUser] = React.useState(null);

//     const handleOpenNavMenu = (event) => {
//         setAnchorElNav(event.currentTarget);
//     };
//     const handleOpenUserMenu = (event) => {
//         setAnchorElUser(event.currentTarget);
//     };

//     const handleCloseNavMenu = () => {
//         setAnchorElNav(null);
//     };

//     const handleCloseUserMenu = () => {
//         setAnchorElUser(null);
//     };

//     const renderUserAvatar = () => {
//         if (user && user.name) {
//             return (
//                 <Avatar>{user.name.charAt(0)}</Avatar>
//             );
//         } else {
//             return (
//                 <Avatar>U</Avatar>
//             );
//         }
//     };

//     return (
//         <AppBar position="sticky" sx={{ backgroundColor: '#F1CED8' ,marginTop: 0}}> {/* צבע ה-AppBar */}
//             <Container maxWidth="xl">
//                 <Toolbar disableGutters>
//                     <Typography variant="h6" noWrap component="a" href="#home" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>
//                         CASA-BELLA
//                     </Typography>

//                     <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//                         <IconButton size="large" aria-label="menu" onClick={handleOpenNavMenu} color="inherit">
//                             <MenuIcon />
//                         </IconButton>
//                         <Menu id="menu-appbar" anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
//                             {Object.entries(categoties).map(([key, value]) => (
//                                 <MenuItem key={key} onClick={handleCloseNavMenu}>
//                                     <Link to={`/${key}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                                         <Typography textAlign="center">{value}</Typography>
//                                     </Link>
//                                 </MenuItem>
//                             ))}
//                         </Menu>
//                     </Box>

//                     <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//                         {Object.entries(categoties).map(([key, value]) => (
//                             <Link to={`/${key}`} key={key} style={{ textDecoration: 'none', margin: '0 10px' }}> {/* רווח בין הקישורים */}
//                                 <Typography sx={{ my: 2, color: 'white', display: 'block' }}>{value}</Typography>
//                             </Link>
//                         ))}
//                     </Box>

//                     <Box sx={{ flexGrow: 0 }}>
//                         <Tooltip title="Open settings">
//                             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                                 {renderUserAvatar()}
//                             </IconButton>
//                         </Tooltip>
//                         <Menu sx={{ mt: '45px' }} anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
//                             {user ? (
//                                 <>
//                                     {user.role === "admin" && (
//                                         <MenuItem onClick={handleCloseUserMenu}>
//                                             <Link to="/add" style={{ textDecoration: 'none', color: 'inherit' }}>
//                                                 <Typography textAlign="center">הוספה</Typography>
//                                             </Link>
//                                         </MenuItem>
//                                     )}
//                                     <MenuItem onClick={handleCloseUserMenu}>
//                                         <Link to="/logout" style={{ textDecoration: 'none', color: 'inherit' }}>
//                                             <Typography textAlign="center">יציאה</Typography>
//                                         </Link>
//                                     </MenuItem>
//                                 </>
//                             ) : (
//                                 <>
//                                     <MenuItem onClick={handleCloseUserMenu}>
//                                         <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
//                                             <Typography textAlign="center">כניסה</Typography>
//                                         </Link>
//                                     </MenuItem>
//                                     <MenuItem onClick={handleCloseUserMenu}>
//                                         <Link to="/signUp" style={{ textDecoration: 'none', color: 'inherit' }}>
//                                             <Typography textAlign="center">הרשמה</Typography>
//                                         </Link>
//                                     </MenuItem>
//                                 </>
//                             )}
//                         </Menu>
//                     </Box>

//                     <Link to="/cart" style={{ textDecoration: 'none' }}>
//                         <IconButton>
//                             <ShoppingCartIcon fontSize="small" />
//                             <CartBadge badgeContent={countCart} color="warning" overlap="circular" />
//                         </IconButton>
//                     </Link>
//                 </Toolbar>
//             </Container>
//         </AppBar>
//     );
// };

// export default NavBar;


