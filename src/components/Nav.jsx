import '../style/Navbar.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from './CartContext'; 
import { useWishlist } from './WishlistContext'; 
import { useUser } from './UserContext';      

export default function Nav() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const navigate = useNavigate();

  const validKeywords = [
    "dresses", "tops", "swimmings", "shoes", "footwear", "bags", 
    "shirts", "pants", "top", "accessories", "kidswear"
  ];

  const handleNavigation = (path, e) => {
    if (e) e.stopPropagation(); 
    navigate(path);
    setActiveMenu(null); 
    setShowSearchBar(false); 
    setIsMobileMenuOpen(false); 
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      const cleanQuery = searchQuery.trim().toLowerCase();

      if (validKeywords.includes(cleanQuery)) {
        navigate(`/search?q=${cleanQuery}`);
        setShowSearchBar(false);
        setSearchQuery("");
        setIsMobileMenuOpen(false);
      } else {
        alert("This item is not available or search keyword is invalid.");
      }
    }
  };

  const { cartItems } = useCart(); 
  const { wishlistItems } = useWishlist(); 
  const { user } = useUser(); 

  const cartCount = cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  const wishlistCount = wishlistItems ? wishlistItems.length : 0;

  return (
    <nav className="navbar">
      <div className="logo" onClick={(e) => handleNavigation("/", e)}>
        SeyShoppy
      </div>

      {showSearchBar ? (
        <div className="nav-search-container">
          <input 
            type="text" 
            className="nav-search-input"
            placeholder="Search categories (e.g., dresses, tops, bags...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchSubmit}
            autoFocus
          />
          <button className="close-search-btn" onClick={() => setShowSearchBar(false)}>✕</button>
        </div>
      ) : (
        /* TOGGLE DRAWER MENU */
        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-drawer-open' : ''}`}>
          <li
            onMouseEnter={() => setActiveMenu('women')}
            onMouseLeave={() => setActiveMenu(null)}
            className="nav-item"
          >
            <span className="nav-title" onClick={(e) => handleNavigation("/women/all", e)}>Women</span>
            {activeMenu === 'women' && (
              <div className="mega-menu" onClick={(e) => e.stopPropagation()}>
                <div className="Menu-column">
                  <h4 onClick={(e) => handleNavigation("/women/dresses", e)}>Dresses</h4>
                  <h4 onClick={(e) => handleNavigation("/women/tops", e)}>Tops</h4>
                  <h4 onClick={(e) => handleNavigation("/women/swimmings", e)}>Swimmings</h4>
                  <h4 onClick={(e) => handleNavigation("/women/shoes", e)}>Footwear</h4>
                  <h4 onClick={(e) => handleNavigation("/accessories/bags", e)}>Bags</h4>
                </div>
              </div>
            )}
          </li>

          <li
            onMouseEnter={() => setActiveMenu('men')}
            onMouseLeave={() => setActiveMenu(null)}
            className="nav-item"
          >
            <span className="nav-title" onClick={(e) => handleNavigation("/men/all", e)}>Men</span>
            {activeMenu === 'men' && (
              <div className="mega-menu" onClick={(e) => e.stopPropagation()}>
                <div className="Menu-column">
                  <h4 onClick={(e) => handleNavigation("/men/shirts", e)}>Shirts</h4>
                  <h4 onClick={(e) => handleNavigation("/men/pants", e)}>Pants</h4>
                  <h4 onClick={(e) => handleNavigation("/men/swimmings", e)}>Swimmings</h4>
                  <h4 onClick={(e) => handleNavigation("/men/shoes", e)}>Shoes</h4>
                </div>
              </div>
            )}
          </li>

          <li
            onMouseEnter={() => setActiveMenu('kids')}
            onMouseLeave={() => setActiveMenu(null)}
            className="nav-item"
          >
            <span className="nav-title" onClick={(e) => handleNavigation("/kid/all", e)}>Kids</span>
            {activeMenu === 'kids' && (
              <div className="mega-menu" onClick={(e) => e.stopPropagation()}>
                <div className="Menu-column">
                  <h4 onClick={(e) => handleNavigation("/kid/top", e)}>Top</h4>
                  <h4 onClick={(e) => handleNavigation("/kid/pants", e)}>Pants</h4>
                  <h4 onClick={(e) => handleNavigation("/kid/swimmings", e)}>Swimmings</h4>
                  <h4 onClick={(e) => handleNavigation("/kid/shoes", e)}>Shoes</h4>
                </div>
              </div>
            )}
          </li>

          <li onClick={(e) => handleNavigation("/accessories/all", e)}>Accessories</li>
          <li onClick={(e) => handleNavigation("/shoes/all", e)}>Foot Wear</li>

          {/* 👤 MOBILE ONLY LOGIN CONTAINER (Hidden completely on Web Desktop layout) */}
          <li className="mobile-login-link">
            {user ? (
              <span className="mobile-profile-name" onClick={(e) => handleNavigation("/profile", e)}>
                👤 {user.name.split(' ')[0]}
              </span>
            ) : (
              <span onClick={(e) => handleNavigation("/login", e)}>Login</span>
            )}
          </li>
        </ul>
      )}

      {/* 🛒 MAIN ROW ACTION UTILITIES BAR */}
      <div className="nav-icons">
        <span className="nav-icon-item" onClick={() => setShowSearchBar(!showSearchBar)}>🔍</span>
        
        <span className="nav-icon-item badge-wrapper" onClick={(e) => handleNavigation("/wishlist", e)}>
          ❤️ {wishlistCount > 0 && <span className="nav-badge-count">{wishlistCount}</span>}
        </span>

        <span className="nav-icon-item badge-wrapper" onClick={(e) => handleNavigation("/cart", e)}>
          🛒 {cartCount > 0 && <span className="nav-badge-count">{cartCount}</span>}
        </span>
        
        {/* 💻 DESKTOP ONLY LOGIN WRAPPER (Hidden completely on Mobile Viewport layout) */}
        <div className="desktop-login-wrapper">
          {user ? (
            <span className="desktop-profile-name" onClick={(e) => handleNavigation("/profile", e)}>
              👤 {user.name.split(' ')[0]}
            </span>
          ) : (
            <span className="desktop-login-btn" onClick={(e) => handleNavigation("/login", e)}>
              Login
            </span>
          )}
        </div>
      </div>

      {/* ☰ HAMBURGER BUTTON TOGGLE */}
      <button 
        className={`mobile-hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        <span className="burger-bar"></span>
        <span className="burger-bar"></span>
        <span className="burger-bar"></span>
      </button>
    </nav>
  );
}