import React, { useState } from 'react';
import './QuantitySelector.css';

const QuantitySelector = ({ onChange, initialValue = 1 }) => {

    const [quantity, setQuantity] = useState(initialValue);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            onChange(quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (quantity < 10) {
            setQuantity(quantity + 1);
            onChange(quantity + 1);
        }
    };

    const handleChange = (event) => {
        let value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 1 && value <= 10) {
            setQuantity(value);
            onChange(value);
        }
    };

    return (
        <div className="quantity-selector">
            <button className="quantity-btn" onClick={handleDecrease}>-</button>
            <input type="number" value={quantity} onChange={handleChange} style={{width:"3rem"}} />
            <button className="quantity-btn" onClick={handleIncrease}>+</button>
        </div>
    );
};

export default QuantitySelector;
