import React from 'react';
import Header from "../../components/header/Header";
import Button from "../../components/layouts/Button";
import { useNavigate, useLocation } from 'react-router-dom';

const OrderSummary = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { cartData, total } = state;

    const handleNavigation = () => {
        navigate("/");
    };

    return (
        <>
            <Header />
            <div className="order-summary-container ms-4">
                <h2 style={{ color: "rgb(98, 98, 137)" }} className="ms-4 mt-4">Order Summary</h2>
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
                            <tr key={item.itemId}>
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                                <td>{item.quantity}</td>
                                <td>${(item.price * item.quantity)}</td>
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
