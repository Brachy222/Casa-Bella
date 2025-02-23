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
                <Link to="/cart">עגלה</Link>
                <Link to="/login">התחברות</Link>
            </div>
            
        </nav>
        
        </>
     );
}
 
export default NavBar;