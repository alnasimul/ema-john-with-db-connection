import React from 'react';
import fakeData from '../../fakeData';

const Manage = () => {
    const handleAddProduct = () => {
        fetch('https://pacific-caverns-69184.herokuapp.com/addProduct',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(fakeData)
        })
    }
    return (
        <div>
           <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default Manage;