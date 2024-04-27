import React, { useState, useEffect } from 'react';
import './Cart.css';
import Header from "../../components/header/Header";
import Button from "../../components/layouts/Button";
import { useAuth } from '../../components/auth/AuthProvider';
import { useToast } from '../../components/Toaster/ToastContext';
import CardDetailsModal from '../../components/Modals/CardDetailsModal';

const Cart = () => {
    const { user } = useAuth();
    const { addToast } = useToast();
    const [cartData, setCartData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const total = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);

    useEffect(() => {
        const carts = JSON.parse(localStorage.getItem('carts'));
        const userCart = carts.find(cart => user.cartId === cart.cartId);
        const items = JSON.parse(localStorage.getItem('items'));

        if (userCart) {
            const updatedCartData = userCart.items.map(cartItem => {
                console.log("cartItem", cartItem)
                const itemDetails = items.find(item => item.id === cartItem.itemId);

                if (itemDetails) {
                    return { ...itemDetails, quantity: cartItem.quantity };
                }
                return null;
            }).filter(item => item !== null);
            setCartData(updatedCartData);
        } else {
            setCartData([]);
        }
    }, [user]);

    const removeFromCart = (itemId) => {
        console.log("cartData", cartData)
        const updatedCartData = cartData.filter(item => item.id !== itemId);

        let carts = JSON.parse(localStorage.getItem('carts'));
        const userCart = carts.find(cart => user.cartId === cart.cartId);
        const userCartItems = userCart.items.filter(item => item.itemId !== itemId);
        userCart.items = userCartItems;
        carts = carts.map(cart => {
            if(cart.cartId === user.cartId){
                return userCart;
            }
            return cart;
        })

        setCartData(updatedCartData);

        // const updatedCarts = JSON.parse(localStorage.getItem('carts')).map(cart => {
        //     if (cart.cartId === user.cartId) {
        //         return { ...cart, items: updatedCartData };
        //     }
        //     return cart;
        // });

        localStorage.setItem('carts', JSON.stringify(carts));
    };

    function checkout() {
        console.log("Opening modal...");
        setShowModal(true);
    }

    return (
        <>
            <Header />
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
            {
                cartData.length > 0 ? (
                    <div className="checkout-button-container" style={{marginBottom: "4rem"}}>
                        <Button buttonName="Checkout" onClick={() => checkout()} className="btn btn-primary checkout-button" />
                    </div>
                ) : (
                    <div>
                        {/* {addToast('Nothing added to cart')} */}
                        <h2 className='cart-header'>Nothing added to cart</h2>
                    </div>
                )
            }
            <CardDetailsModal isOpen={showModal} onClose={() => setShowModal(false)} total={total} />
        </>
    );
}

export default Cart;
