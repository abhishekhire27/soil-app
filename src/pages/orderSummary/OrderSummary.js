import React from 'react';
import Header from "../../components/header/Header";
import Button from "../../components/layouts/Button";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../components/auth/AuthProvider';

const OrderSummary = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { cartData, total } = state;

    const { user } = useAuth();

    function emptyCart(){
        let carts = JSON.parse(localStorage.getItem('carts')) || [];
        const userCartIndex = carts.findIndex(cart => user.cartId === cart.cartId);
        
        if (userCartIndex !== -1) {
            carts[userCartIndex].items = [];
        }
        localStorage.setItem('carts', JSON.stringify(carts));
    }

    const handleNavigation = () => {
        emptyCart()
        navigate("/");
    };

    return (
        <>
            <Header />
            <div className="order-summary-container ms-4">
                <h1>Order Summary</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartData.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>{item.quantity}</td>
                                <td>${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="3">Grand Total</th>
                            <th>${total.toFixed(2)}</th>
                        </tr>
                    </tfoot>
                </table>
                <Button buttonName="Go to home page" onClick={handleNavigation} className="btn btn-primary" />
            </div>
        </>
    );
};

export default OrderSummary;
