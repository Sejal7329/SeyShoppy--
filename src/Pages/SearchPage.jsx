import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/Products';
import '../style/Search.css'; 

export default function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q')?.toLowerCase() || '';

  const matchedProducts = products.filter((product) => {
    return (
      product.name?.toLowerCase().includes(searchQuery) ||
      product.description?.toLowerCase().includes(searchQuery) ||
      product.category?.toLowerCase().includes(searchQuery) ||
      (Array.isArray(product.gender) 
        ? product.gender.some(g => g.toLowerCase().includes(searchQuery))
        : product.gender?.toLowerCase().includes(searchQuery))
    );
  });

  return (
    <div className="search-page-container"> 
      <h2 className="search-title"> 
        Search Results For: <span className="search-query-highlight">"{searchQuery}"</span>
      </h2>
      {matchedProducts.length > 0 ? (
        <div className="search-products-grid"> 
          {matchedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
      ) : (
        <div className="search-empty-state"> 
          <div className="search-empty-icon">🔍</div>
          <p>We couldn't find any items matching your search.</p>
          <p className="search-suggestions-hint">
            Try looking up structural categories like <strong>"shoes"</strong>, <strong>"dresses"</strong>, or <strong>"bags"</strong>!
          </p>
        </div>
      )}
    </div>
  );
}