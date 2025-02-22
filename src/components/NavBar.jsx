import { Link } from 'react-router-dom';
import "../styles/NavBar.css";


const NavBar = (props) => {
    const {categoties} = props;
    
    return ( 
        <>
        <nav>
            {console.log(categoties)}
            <div id="navbarCategories">
            <ul>
                {Object.entries(categoties).map(([key, value]) => (
                    <li key={key}>
                        <Link to={`/${key}`}>{value + ">"}</Link>
                    </li>
                ))}
            </ul>
            </div>
            <div id="privateArea">
                <Link to="/cart">עגלה</Link>
                <Link to="/login">התחברות</Link>
            </div>
            
        </nav>
        
        </>
     );
}
 
export default NavBar;