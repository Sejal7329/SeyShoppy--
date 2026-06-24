import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import CategoryPage from './Pages/CategoryPage';
import WishlistPage from './Pages/WishlistPage';
import CartPage from './Pages/CartPage';
import SearchPage from './Pages/SearchPage'; 
import Contact from './components/Contact';
import LoginPage from './Pages/LoginPage';     
import ProfilePage from './Pages/ProfilePage'; 

import { WishlistProvider } from './components/WishlistContext'; 
import { CartProvider } from './components/CartContext'; 
import { UserProvider } from './components/UserContext';

export default function App() {
  return (
    <UserProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route 
                path="/" 
                element={
                  <>
                    <Home />
                    <Contact />
                  </>
                } 
              />
              <Route path="/:gender/:categoryName" element={<CategoryPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/search" element={<SearchPage />} /> 
              
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </UserProvider>
  )
}