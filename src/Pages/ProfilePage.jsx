import React from 'react';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import '../style/Profile.css'; 

export default function ProfilePage() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="account-page-container" >
        <p>Please log in to view your boutique profile dashboard.</p>
        <button 
          onClick={() => navigate('/login')} 
          className="btn-primary-luxury"

        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="account-page-container" style={{ maxWidth: '600px' }}>
      <h2 className="account-heading">My Account</h2>
      
      <div className="profile-card">
        <div className="profile-details-list">
          <p className="profile-item">
            <strong>Full Name:</strong> {user.name}
          </p>
          <p className="profile-item">
            <strong>Email Address:</strong> {user.email}
          </p>
          <p className="profile-item">
            <strong>Account Status:</strong> Premium SeyShoppy Member ({user.memberSince})
          </p>
        </div>
        
        <button 
          onClick={() => { logout(); navigate('/'); }} 
          className="btn-danger-luxury"
        >
          Logout →
        </button>
      </div>
    </div>
  );
}