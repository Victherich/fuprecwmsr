// Popup.js
import React from 'react';
import '../CSS/Popup.css';  // Create this CSS file for styles
import "animate.css"

const Popup = ({ isVisible, onClose, title, children }) => {
  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content animate__animated animate__slideInUp">
        <h2 className= "animate__animated animate__slideInRight">{title}</h2>
        <div className="popup-body animate__animated animate__slideInLeft">{children}</div>
        {/* <button onClick={onClose} className="popup-close-btn animate__animated animate__slideInDown">Close</button> */}
      </div>
    </div>
  );
};

export default Popup;
