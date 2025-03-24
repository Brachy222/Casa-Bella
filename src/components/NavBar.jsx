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
                            <Link to="/home">דף הבית</Link>
                        </li>
                        <li key={"all"} className="navDiv">
                            <Link to="/products">כל המוצרים</Link>
                        </li>
                        {Object.entries(categoties).map(([key, value]) => (
                            <li key={key} className="navDiv">
                                <Link to={`/${key}`}>{value + ">"}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div id="privateArea">
                    {user && user.role === "admin" && (
                        <>
                            <Link to="/add">הוספה</Link>
                            {/* <Link to="/update">עדכון</Link> */}
                        </>
                    )}

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
