import Product from "../components/Product";

const ProductList = (props) => {
    return ( 
        <>
        <ul>
            {props.products.map((product) => {
            return <li key={product._id}>
            <Product product={product} />
            </li>
        })}
        </ul>
        </>
     );
}
 
export default ProductList;