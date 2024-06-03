import axios from 'axios';

const apiUrl = process.env.REACT_APP_BASE_URL;

const apiClient = axios.create({
  baseURL: apiUrl + 'items',
});

export const getAllItems = async () => {
    try{
        const response = await apiClient.get('/');
        return response;
    }
    catch(error){
        throw new Error(error.response && error.response.data ? JSON.stringify(error.response.data.error) : 'Unknown Error');
    }
};