import React, { useState, useEffect } from 'react';
import './Toast.css'; // Import CSS file for styling

const Toast = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // Hide the toast after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${visible ? 'show' : ''}`} onClick={onClose}>
      {message}
    </div>
  );
}

export default Toast;
