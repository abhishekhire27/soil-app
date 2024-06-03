import axios from 'axios';

const apiUrl = process.env.REACT_APP_BASE_URL;

const apiClient = axios.create({
  baseURL: apiUrl + 'cartItems',
});

export const emptyCartBackend = async (cartId) => {
    const cartData = {
        "cartId": cartId
    }
    try{
        const response = await apiClient.post('/emptyCart', cartData);
        return response;
    }
    catch(error){
        return null;
    }
};

export const getCartItems =  async (cartId) => {
    try{
        const response = await apiClient.get(`/getCartItems?cartId=${cartId}`);
        return response;
    }
    catch(error){
        return null;
    }
}

export const removeFromCartBackend = async (cartId, itemId) => {
    const cartData = {
        "cartId": cartId,
        "itemId": itemId
    }
    try{
        const response = await apiClient.post('/removeFromCart', cartData);
        return response;
    }
    catch(error){
        return null;
    }
};

export const addToCartBackend = async (itemsToAdd) => {
    try{
        const response = await apiClient.post('/addToCart', itemsToAdd);
        return response;
    }
    catch(error){
        return null;
    }
};