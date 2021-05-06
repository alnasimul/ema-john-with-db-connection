import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link, useHistory } from 'react-router-dom';
import happyImage from '../../images/giphy.gif'





const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();
    const handelRemoveItem = (productKey) => {
        console.log('remove clicked');

        const newCart = cart.filter(pd => pd.key !== productKey);

        setCart(newCart);

        removeFromDatabaseCart(productKey);
    }
    const handelProceedCheckout = () => {
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();

        history.push('/shipment')
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();

        const productKeys = Object.keys(savedCart);

        fetch('http://localhost:5000/productsByKeys',{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(productKeys)

        })
        .then( res => res.json() )
        .then( data => setCart(data) );

        // const cartProducts = productKeys.map(key => {
        //     const product = fakeData.find(pd => pd.key === key);

        //     product.quantity = savedCart[key];

        //     return product;
        // })
        // setCart(cartProducts);
    }, [])
    let thankYou;

    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {thankYou}
                {
                    !cart.length && <h1>Your cart is empty. <a href="/shop">Keep Shopping</a></h1>
                }
                {cart.map(pd => <ReviewItem
                    key={pd.key} product={pd} handelRemoveItem={handelRemoveItem}>
                </ReviewItem>)}
            </div>
            <div className="cart-container">
                <Cart cart = {cart}>
                    <button  onClick={handelProceedCheckout} className="main-button">Proceed to Checkout</button> 
                </Cart>
            </div>
        </div>
    );
};

export default Review;