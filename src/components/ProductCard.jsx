import React from 'react';
import { useWishlist } from './WishlistContext'; 
import { useCart } from './CartContext'; 
import '../style/ProductCard.css';

export default function ProductCard(props) {
  const { wishlistItems, toggleWishlist } = useWishlist();
  
  const { cartItems, addToCart, removeFromCart } = useCart(); 

  const productData = props.product ? props.product : props;
  const { id, image, name, description, price } = productData;

  const isWishlisted = wishlistItems.some((item) => item.id === id);

  const isAlreadyInCart = cartItems?.some((item) => item.id === id);

  return (
    <div className="luxury-product-card">
      <img src={image} alt={name} className="product-card-image" />

      <div className="product-card-overlay">
        <div className="product-card-details">
          <h3 className="product-card-title">{name}</h3>
          <p className="product-card-description">{description}</p>
          <p className="product-card-price">₹{price}</p>
          
          <div className="product-action-container">
            {isAlreadyInCart ? (
              <button 
                className="cart-btn-success"
                onClick={(e) => {
                  e.stopPropagation();
                  if (typeof removeFromCart === 'function') {
                    removeFromCart(id); 
                  }
                }}
                title="Remove from Cart"
              >
                <span className="tick-mark">✓</span> Added
              </button>
            ) : (
              <button 
                className="add-to-cart-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart({ id, image, name, description, price });
                }}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>

        <div className="product-card-actions">
          <button 
            className={`card-action-btn wishlist-btn ${isWishlisted ? 'active-wishlist' : ''}`} 
            onClick={(e) => { 
              e.stopPropagation(); 
              toggleWishlist({ id, image, name, description, price }); 
            }}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            {isWishlisted ? '❤️' : '♡'}
          </button>
        </div>
      </div>
    </div>
  );
}