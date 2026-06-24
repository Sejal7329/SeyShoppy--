import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/Products'; 
import '../style/Category.css'; 

export default function CategoryPage() {
  const { gender, categoryName } = useParams();

  const filteredProducts = products.filter((product) => {
    // 🛠️ SAFE CHECK: Handles both single strings and multi-gender arrays cleanly
    let matchesGender = false;

    if (Array.isArray(product.gender)) {
      matchesGender = product.gender.some(
        (g) => typeof g === 'string' && g.toLowerCase() === gender?.toLowerCase()
      );
    } else if (typeof product.gender === 'string') {
      matchesGender = product.gender.toLowerCase() === gender?.toLowerCase();
    }
    
    if (categoryName?.toLowerCase() === 'all') {
      return matchesGender; 
    }

    return (
      matchesGender &&
      product.category?.toLowerCase() === categoryName?.toLowerCase()
    );
  });

  const handleAddToCart = (product) => {
    console.log(`${product.name} added to Cart! 🛒`);
  };

  const handleAddToWishlist = (product) => {
    console.log(`${product.name} added to Wishlist! ❤️`);
  };

  return (
    <div className="category-page-container">
      <h1 className="category-title">
        {gender}’s {categoryName === 'all' ? 'Collection' : categoryName}
      </h1>

      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id} /* 🛠️ Keep passing individual unique ID explicitly */
              image={product.image}
              name={product.name}
              description={product.description}
              price={product.price}
              onAddToCart={() => handleAddToCart(product)}
              onAddToWishlist={() => handleAddToWishlist(product)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-category-message">
          <p>No products found in this category yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}