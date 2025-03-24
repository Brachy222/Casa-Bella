import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Product from "../components/Product";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CircularIndeterminate = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress className='CircularProgress-div' sx={{ color: '#8B4513' }}/>
    </Box>
  );
};

const ProductList = (props) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1);
    const productsPerPage = 8;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const newCategory = props.category ? "category/" + props.category : "";
                const url = `https://project-in-node.onrender.com/api/products/${newCategory}?page=${currentPage}&limit=${productsPerPage}`;
                console.log("url: " + url);
                const response = await axios.get(url);
                setProducts(response.data.products); 
                setTotalPages(response.data.totalPages);
                console.log(response.data);
            } catch (err) {
                setError(err.message); 
            }
        };
        fetchProducts();
    }, [props.category, currentPage]); 
    if (error) {
        return <div>Error: {error}</div>;
    }

    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber); 
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
                <CircularIndeterminate />
            )}

            <div className='paging'>
                <Stack spacing={2}>
                    <Pagination
                        count={totalPages} 
                        page={currentPage} 
                        onChange={handlePageChange} 
                        shape="rounded"
                    />
                </Stack>
            </div>
        </>
    );
};

export default ProductList;
