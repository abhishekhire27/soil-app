import React, { useState } from 'react';
import './Cart.css';
import Header from "../../components/header/Header";
import Button from "../../components/layouts/Button";
import CardDetailsModal from '../../components/modals/CardDetailsModal';
import useCarts from "../../hooks/useCart";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();

    const { cartData, removeFromCart } = useCarts();
    const [showModal, setShowModal] = useState(false);

    const total = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);

    function checkout() {
        setShowModal(true);
    }

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <>
            <Header />
            <div className="row mt-4 mb-4">
                <div className="col-md-12" style={{ position: 'relative', height: '500px' }}>
                    <img
                        src="/assets/cartImage.jpg"
                        className="card-img-top img-fluid"
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </div>
            </div>
            <div className='cart-container mt-4 ms-4'>
                {cartData.map(item => (
                    <div key={item.id} className="cart-item">
                        <div className="item-image">
                            <img src={`/assets/items/${item.image}`} alt={item.name} />
                        </div>
                        <div className="item-details">
                            <h5>{item.name}</h5>
                            <p>{item.description}</p>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <Button buttonName="Remove" onClick={() => removeFromCart(item.id)} className="btn btn-danger" />
                        </div>
                    </div>
                ))}
            </div>
            {cartData.length > 0 && (
                <div className="total-container ms-4">
                    <h2>Total: ${total}</h2>
                </div>
            )}
            {
                cartData.length > 0 ? (
                    <div className="checkout-button-container">
                        <Button buttonName="Checkout" onClick={() => checkout()} className="btn btn-primary checkout-button" />
                        <Button buttonName="Continue Shopping" onClick={() => handleNavigation("/")} className="btn checkout-button" />
                    </div>
                ) : (
                    <div>
                        <h2 className='cart-header'>Nothing added to cart</h2>
                        <Button buttonName="Continue Shopping" onClick={() => handleNavigation("/")} className="btn btn-primary checkout-button" />
                    </div>
                )
            }
            <CardDetailsModal isOpen={showModal} onClose={() => setShowModal(false)} total={total} />
        </>
    );
}

export default Cart;
