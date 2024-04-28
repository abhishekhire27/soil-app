import { useEffect, useState } from "react";
import { useAuth } from '../components/auth/AuthProvider';
import { useToast } from '../components/Toaster/ToastContext';

function useCarts () {
    const [cartData, setCartData] = useState([]);
    const { user } = useAuth();
    const { addToast } = useToast();
    const [itemQuantities, setItemQuantities] = useState({});

    useEffect(() => {
        if(!user){
            return;
        }
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

    const addToCart = (itemId) => {
        if (user === null) {
            addToast('Please Login to add to cart!');
            return;
        }
    
        let carts = JSON.parse(localStorage.getItem('carts')) || [];
        const userCartIndex = carts.findIndex(cart => user.cartId === cart.cartId);
    
        if (userCartIndex !== -1) {
            const newItems = [...carts[userCartIndex].items];
            const itemIndex = newItems.findIndex(item => item.itemId === itemId);
    
            if (itemIndex !== -1) {
                newItems[itemIndex].quantity = itemQuantities[itemId];
            } else {
                newItems.push({ itemId, quantity: itemQuantities[itemId] || 1 });
            }
    
            carts[userCartIndex].items = newItems;
        } else {
            carts.push({
                cartId: user.cartId,
                items: [{ itemId, quantity: itemQuantities[itemId] || 1 }]
            });
        }
    
        localStorage.setItem('carts', JSON.stringify(carts));
        addToast('Item added to cart');
    }
    
    const addToCartList = (itemId, quantity) => {
        setItemQuantities(prev => ({ ...prev, [itemId]: quantity }));
    }
    return {cartData, addToCart, removeFromCart, itemQuantities, addToCartList}
}

export default useCarts;