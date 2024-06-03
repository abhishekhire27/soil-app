import { useEffect, useState } from "react";
import { useAuth } from "../components/auth/AuthProvider";
import { useToast } from "../components/Toaster/ToastContext";
import { getCartItems, addToCartBackend, removeFromCartBackend } from "../services/cart.services.js";

function useCarts() {
  const [cartData, setCartData] = useState([]);
  const { user } = useAuth();
  const { addToast } = useToast();
  const [itemQuantities, setItemQuantities] = useState({});

  useEffect(() => {
    if (!user) {
      return;
    }
    try{
      getCartItems(user.cartId).then(updatedCartData => {
        if(updatedCartData){
          setCartData(updatedCartData.data);
        }
      });
      
    }
    catch(error){
      
    }

  }, [user]);

  const removeFromCart = async(itemId) => {
    const updatedCartData = await removeFromCartBackend(user.cartId, itemId);
    if(updatedCartData){
      setCartData(updatedCartData.data);
    }
    else{
      addToast("Fail to remove from cart items", { appearance: 'error' });
    }

  };

  const addToCart = async(itemId) => {

    if (user === null) {
      addToast("Please Login to add to cart!");
      return;
    }

    const itemsToAdd = getItemQuantitiesArray();
    if(itemsToAdd.length === 0){
      setItemQuantities(prev => {
        const newQuantities = { ...prev, [itemId]: 1 };
        (async () => {
          const itemsArray = Object.entries(newQuantities).map(([itemId, quantity]) => ({
            cartId: user.cartId,
            itemId,
            quantity
          }));
            const updatedCartData = await addToCartBackend(itemsArray);
            if (updatedCartData) {
                addToast("Item added to cart");
                setItemQuantities({})
            } else {
                addToast("Fail to add item to cart", { appearance: 'error' });
            }
        })();
        return newQuantities;
    });
    }
    else{
      const updatedCartData = await addToCartBackend(itemsToAdd);
      if(updatedCartData){
        setItemQuantities({})
        addToast("Item added to cart");
      }
      else{
        addToast("Fail to add item to cart", { appearance: 'error' });
      }
    }
    
  };

  const getItemQuantitiesArray = () => {
    const itemsArray = Object.entries(itemQuantities).map(([itemId, quantity]) => ({
      cartId: user.cartId,
      itemId,
      quantity
    }));
  
    return itemsArray;
  };
  

  const addToCartList = (itemId, quantity) => {
    setItemQuantities((prev) => ({ ...prev, [itemId]: quantity }));
  };

  return { cartData, addToCart, removeFromCart, itemQuantities, addToCartList };
}

export default useCarts;
