import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    let {productKey} = useParams();
    const [product,setProduct] = useState({})
    useEffect(() => {
        fetch('https://pacific-caverns-69184.herokuapp.com/product/' + productKey)
        .then( res => res.json())
        .then(data => setProduct(data))
    },[productKey])

    //let product = fakeData.find(pd => pd.key === productKey);
    //console.log(product);
    return (
        <div>
            <h1>Your Product Details</h1>
            <Product showAddProduct = {false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;