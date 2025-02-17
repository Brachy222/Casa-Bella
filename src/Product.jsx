const Product = ({product}) => {
    return ( 
        <>
        <div className="product">
            <img src={product.image} alt={product.name} />
            <h3>{product.productName}</h3>
            <p>{product.price + '.00 ש"ח'}</p>
            {/* <button onClick={() => props.addToCart(props)}>Add to Cart</button> */}
        </div>
        </>
     );
}
 
export default Product;