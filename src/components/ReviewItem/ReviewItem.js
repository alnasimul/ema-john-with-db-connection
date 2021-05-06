import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    const { name, quantity, key, price,img } = props.product
    return (
        <div className='review-item'>
            <div>
                <img src={img} alt=""/>
            </div>
            <div className='review-item-info'>
            <h4 className="product-heading">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>Price: <small>${price}</small></p>
            <br />
            <button className="main-button" onClick={() => props.handelRemoveItem(key)}>Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;