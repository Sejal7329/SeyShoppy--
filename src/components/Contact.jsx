import React from 'react';
import '../style/Contact.css';

export default function Contact() {
  return (
    <div className="Contact-page">
      <div className="Contact-section-container">
        
        <div className="Contact-block">
          <h3>Contact</h3>
          <p className="contact-detail">+91 (022) 555-0192</p>
          <p className="contact-detail">seyshoppy@gmail.com</p>
        </div>

        <div className="Follow-block">
          <h3>Follow Us</h3>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link">Instagram</a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="social-link">LinkedIn</a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link">Facebook</a>
        </div>

      </div>
    </div>
  );
}