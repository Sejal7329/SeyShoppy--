# SeyShoppy 🛍️

SeyShoppy is a minimalist, luxury fashion e-commerce platform designed to offer a seamless, premium shopping experience. Built using React, the platform features a highly optimized digital storefront, dynamic cart management, and interactive user flows.

## ✨ Features

- **Luxury UI Design Aesthetic:** Minimalist interface using an ocean-inspired color palette (sea blue and sea green accents).
- **Dynamic Cart Toggle System:** Smooth, intuitive product cards that transform from an "Add to Cart" state into an invisible, compact confirmation button (`✓ Added`) upon interaction.
- **Smart Toggle Lifecycle:** Clicking the active confirmation button safely removes the item directly from the cart layout.
- **Unique Inventory Tracking:** The shopping bag calculation isolates distinct product types from raw unit quantities, preventing header badge inflation.
- **Persistent Storage:** Integrated `localStorage` pipeline ensures state preservation across page instances.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React (Functional Components, Hooks)
- **State Management:** React Context API (`CartProvider`, `WishlistProvider`)
- **Styling:** Vanilla CSS3 (Custom Luxury Overlays, Glassmorphic layouts)

---

## 📁 Key File Structure
src/
├── components/
│   ├── CartContext.js       # Centralized context tracking cart arrays & updates
│   ├── WishlistContext.js   # Global configuration for wishlist selections
│   └── ProductCard.jsx      # Premium interactive product card layout component
├── pages/
│   └── CartPage.jsx         # Summary checkout layout routing list structures
└── style/
    ├── ProductCard.css      # Custom structural alignments & overlay button styles
    └── CartPage.css         # Checklist overview & breakdown panel metrics

    