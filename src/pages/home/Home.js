import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import itemsData from './itemsData.json';
import Button from "../../components/layouts/Button";
import { useAuth } from '../../components/auth/AuthProvider';
import { useToast } from '../../components/Toaster/ToastContext';
import QuantitySelector from "../../components/quantitySelector/QuantitySelector";

function Home() {
    const { user } = useAuth();
    const { addToast } = useToast();

    const [itemQuantities, setItemQuantities] = useState({});

    useEffect(() => {
        if (!localStorage.getItem('items')) {
            localStorage.setItem('items', JSON.stringify(itemsData));
        }
    }, []);

    useEffect(() => {
        if (user && localStorage.getItem('carts')) {
            const carts = JSON.parse(localStorage.getItem('carts'));
            const userCart = carts.find(cart => user.cartId === cart.cartId);
            if (userCart) {
                setItemQuantities(userCart.items.reduce((acc, item) => ({ ...acc, [item.itemId]: item.quantity }), {}));
            }
        }
    }, [user]);

    const addToCartList = (itemId, quantity) => {
        setItemQuantities(prev => ({ ...prev, [itemId]: quantity }));
    }

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

        carts = carts.filter(cart => cart.cartId === user.cartId);

        localStorage.setItem('carts', JSON.stringify(carts));
        addToast('Item added to cart');
    }


    return (
        <>
            <Header />
            <h2 className="mt-3 ps-3 pt-2">Fruits and Vegetables</h2>
            <div className="container mt-4">
                <div className="row">
                    {itemsData.map(item => (
                        <div key={item.id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="box">
                                    <img src={`/assets/items/${item.image}`} className="card-img-top img-fluid" alt={item.name} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <p className="card-text">Price: ${item.price}</p>
                                    <span>
                                        <p>Quantity: </p>
                                        <QuantitySelector
                                            onChange={(quantity) => addToCartList(item.id, quantity)}
                                            initialValue={itemQuantities[item.id] || 1}
                                        />
                                        </span>
                                    <Button buttonName="Add to cart" onClick={() => addToCart(item.id)} className="btn btn-primary" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;