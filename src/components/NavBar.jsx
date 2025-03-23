import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart } from "@mui/icons-material";
import "../styles/NavBar.css";

const NavBar = (props) => {
    const { categoties } = props;
    const user = useSelector((state) => state.user.currentUser);
    console.log("משתמש נוכחי", user);

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
                            <Link to="/update">עדכון</Link>
                        </>
                    )}

                    {user ? (
                        <>
                            <span>שלום, {user?.userName || "אורח"}</span>
                            <Link to="/login">יציאה</Link>
                        </>
                    ) : (
                        <>
                            <span>שלום, אורח</span>
                            <Link to="/login">כניסה</Link>
                            <Link to="/signUp">הרשמה</Link>
                        </>
                    )}
                    {user && <Link to="/order">  סיום הזמנה </Link>}
                    <Link to="/cart">
                        <ShoppingCart style={{ color: "black" }} />
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
