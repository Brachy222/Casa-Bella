import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "../styles/NavBar.css";


const NavBar = (props) => {
    const {categoties} = props;
    const user = useSelector(state => state.user.currentUser);
    console.log("משתמש נוכחי",user);
    return ( 
        <>
        <nav>
            {console.log(categoties)}
            <div id="navbarCategories">
            <ul>
                <li key={"home"} className='navDiv'>
                    <Link to="/home">דף הבית</Link>
                </li>
                <li key={"all"} className='navDiv'>
                    <Link to="/products">כל המוצרים</Link>
                </li>
                {Object.entries(categoties).map(([key, value]) => (
                    <li key={key} className='navDiv'>
                        <Link to={`/${key}`}>{value + ">"}</Link>
                    </li>
                ))}
            </ul>
            </div>
            <div id="privateArea">
                <Link to="/add">הוספה</Link>                                                                                                                                  
                {user&&<span>שלום, {user.user.userName}</span>}
                <Link to="/cart">עגלה 🛒</Link>
                <Link to="/login">כניסה</Link>
                <Link to="/signUp">הרשמה</Link>

            </div>
            
        </nav>
        
        </>
     );
}
 
export default NavBar;