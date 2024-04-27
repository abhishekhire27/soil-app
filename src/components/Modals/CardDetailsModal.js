import React, { useState } from 'react';
import './CardDetailsModal.css';

const CardDetailsModal = ({ isOpen, onClose, total }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const validateCardDetails = () => {
        // Add validation logic here (simple example)
        const cardNumberValid = /^\d{16}$/.test(cardNumber); // Simple validation for a 16 digit card number
        const expiryValid = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiry); // MM/YY format
        const cvvValid = /^\d{3}$/.test(cvv); // 3 digit CVV

        if (!cardNumberValid || !expiryValid || !cvvValid) {
            alert("Please enter valid card details");
            return false;
        }
        return true;
    };

    const handleCheckout = () => {
        if (validateCardDetails()) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className='custom-modal'>
            <h2>Enter your card details</h2>
            <div>
                <input type="number" placeholder="Card Number" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
                <input type="text" placeholder="MM/YY" value={expiry} onChange={e => setExpiry(e.target.value)}/>
                <input type="number" placeholder="CVV" value={cvv} onChange={e => setCvv(e.target.value)} />
            </div>
            <button onClick={onClose}>
                Close
            </button>
        </div>
        
        // <div className="modal">
        //     <div className="modal-content">
        //         <span className="close" onClick={onClose}>&times;</span>
        //         <h2>Enter your card details</h2>
        //         <div>
        //             <label>Total: ${total.toFixed(2)}</label>
        //         </div>
        //         <div>
        //             <input type="text" placeholder="Card Number" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
        //         </div>
        //         <div>
        //             <input type="text" placeholder="MM/YY" value={expiry} onChange={e => setExpiry(e.target.value)} />
        //         </div>
        //         <div>
        //             <input type="text" placeholder="CVV" value={cvv} onChange={e => setCvv(e.target.value)} />
        //         </div>
        //         <button onClick={handleCheckout}>Checkout</button>
        //     </div>
        //     <div className="modal-backdrop"></div>
        // </div>
        // <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000, backgroundColor: 'white', padding: '20px' }}>
        //     <h2>Modal is Open</h2>
        //     <button onClick={onClose}>Close</button>
        // </div>
    );
};

export default CardDetailsModal;