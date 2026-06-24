import React from 'react';
import { useCart } from '../components/CartContext';
import '../style/CartPage.css';

export default function CartPage() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <div className="cart-page-wrapper">
      <h2 className="cart-heading">YOUR SHOPPING BAG ({cartItems.length})</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart-view">
          <p>Your luxury shopping bag is currently empty.</p>
        </div>
      ) : (
        <div className="cart-content-layout">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-row">
                <img src={item.image} alt={item.name} className="cart-item-thumbnail" />
                
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-desc">{item.description}</p>
                  <p className="cart-item-price-tag">₹{item.price}</p>
                </div>

                <div className="cart-quantity-controls">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>

                <div className="cart-item-actions">
                  <p className="cart-item-subtotal">₹{item.price * item.quantity}</p>
                  <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>
                    ✕ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary-panel">
            <h3>ORDER SUMMARY</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-shipping-text">FREE</span>
            </div>
            <hr />
            <div className="summary-row total-row">
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>
            <button className="checkout-action-btn">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      )}
    </div>
  );
}