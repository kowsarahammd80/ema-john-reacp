import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
  let [products, setProducts] = useState([]);

  let [cart, setCart] = useState([])
   
  useEffect(() => {
    console.log('befor fetch')
    fetch('products.json')
    .then(res => res.json())
    .then(data => {
      setProducts(data);
      console.log('product loaded')
    })
  },[])

  useEffect(() => {
    console.log('localstoraed')
     let storedCart = getStoredCart();
     let saveCart = [];
     for(let id in storedCart){
       let addedProduct = products.find(product => product.id === id)
       if(addedProduct){
          let quantity = storedCart[id];
          addedProduct.quantity = quantity;
          saveCart.push(addedProduct);
       }
    }
    setCart(saveCart);
    // console.log('local finsh')
  },[products])
  
  let handelAddToCart = (selectedProduct) =>{
    // console.log(product)
    let newCart = [];
    let exists = cart.find(product => product.id === selectedProduct.id)
    if(!exists){
      selectedProduct.quantity = 1;
      newCart= [...cart, selectedProduct];
    }
    else{
      let rest = cart.filter(product => product.id !== selectedProduct.id)
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists.id]
    }
    
    setCart(newCart)
    addToDb(selectedProduct.id)
  }

  return (
    <div className='shop-container'>
      <div className="products-container">
        {
          products.map(product => <Product key={product.id} product={product} handelAddToCart= {handelAddToCart}></Product> )
        }
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;