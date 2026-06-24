import React from 'react';
import { useWishlist } from '../components/WishlistContext.jsx';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import '../style/Wishlist.css'; 

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="wishlist-page-container">
      <h2 className="wishlist-title">
        My Boutique Wishlist ({wishlistItems.length})
      </h2>

      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty-state">
          <div className="wishlist-empty-icon">♡</div>
          <p>Your Wishlist collection is empty.</p>
          <button className="wishlist-shop-btn" onClick={() => navigate('/')}>
            Discover Pieces
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}