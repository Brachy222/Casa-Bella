import { Link } from 'react-router-dom';


const NavBar = (props) => {
    const {categoties} = props;
    
    return ( 
        <>
        {console.log(categoties)}
        <div id="navbarCategories">
           <ul>
            {categoties.map((category) => (
                <li key={category.id}>
                    {<Link to={`/${category}`}>{category}</Link>}
                </li>
            ))}
        </ul> 
        </div>
        <div id="privateArea">
            <Link to="/cart">עגלה</Link>
            <Link to="/login">התחברות</Link>
        </div>
        
        </>
     );
}
 
export default NavBar;