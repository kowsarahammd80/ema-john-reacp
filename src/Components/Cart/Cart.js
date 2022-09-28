import React from 'react';
import './Cart.css'

const Cart = (props) => {
  let {cart} = props;

  let total = 0;
  let shipping = 0;
  let quantity = 0;
  for(let product of cart){
    total = total + product.price * product.quantity;
    shipping = shipping + product.shipping
    quantity = quantity + product.quantity
  }
  let tex = parseFloat((total * 0.1).toFixed(2));
  let grandTotal = total + shipping + tex;
  // console.log(cart) 
  return (
    <div className='cart'>
       <h4>Order Summary</h4>
        <p>Selected Item: {quantity}</p>
        <p>Total Price:$ {total}</p>
        <p>Total Shipping:$ {shipping}</p>
        <p>Tex:$ {tex}</p>
        <p>Grand Total: {grandTotal.toFixed(2)}</p>
    </div>
  );
};

export default Cart;