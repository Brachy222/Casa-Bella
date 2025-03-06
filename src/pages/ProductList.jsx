import { useState, useEffect } from 'react';
import axios from 'axios';
import Product from "../components/Product";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ProductList = (props) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // עמוד נוכחי
    const [totalPages, setTotalPages] = useState(1);
    const productsPerPage = 8;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const newCategory = props.category ? "category/" + props.category : "";
                const url = `https://project-in-node.onrender.com/api/products/${newCategory}?page=${currentPage}&limit=${productsPerPage}`;
                console.log("url: " + url);
                const response = await axios.get(url);
                setProducts(response.data.products); // עדכון המוצרים
                setTotalPages(response.data.totalPages); // עדכון מספר הדפים הכללי
                console.log(response.data);
            } catch (err) {
                setError(err.message); // טיפול בשגיאות
            }
        };

        fetchProducts();
    }, [props.category, currentPage]); // כל שינוי בקטגוריה או עמוד יגרום להחזרת מוצרים חדשים

    if (error) {
        return <div>Error: {error}</div>;
    }

    // פונקציה שמטפלת בשינוי עמוד
    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber); // עדכון העמוד הנוכחי
    };

    return (
        <>
            {products.length ? (
                <ul>
                    {products.map((product) => (
                        <li key={product._id}>
                            <Product product={product} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>loading...</p>
            )}

            {/* כפתורי דפדוף */}
            <div>
                <Stack spacing={2}>
                    <Pagination
                        count={totalPages} 
                        page={currentPage} 
                        onChange={handlePageChange} // פעולה שיתבצע כשנלחץ על כפתור דף
                        shape="rounded"
                    />
                </Stack>
            </div>
        </>
    );
};

export default ProductList;
