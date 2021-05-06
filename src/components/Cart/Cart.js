import React from 'react';




const Cart = (props) => {

    let cart = props.cart;
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity || 1 ;
    
    }

    function formatNumber(num){
        const precision = num.toFixed(2);

        return Number(precision)
    }
    let shipping = 0;

    if(total >35){
        shipping = 0;
    }
    else if(total > 0){
        shipping = 12.99;
    }
    else if(total > 15){
        shipping = 5.99
    }

    let tax = total/10;

    let grandTotal = total + shipping + tax;
    return (
        <div>
            <h3>Order Summery </h3>
            <p>Items Ordered:{cart.length}</p>
            <p>Product price: {formatNumber(total)}</p>
            <p>tax + Vat : {formatNumber(tax)}</p>
            <p><small> Shipping: {shipping} </small></p>
            <p>Price: {formatNumber(grandTotal)} </p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;