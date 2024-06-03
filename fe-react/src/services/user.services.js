import axios from 'axios';

const apiUrl = process.env.REACT_APP_BASE_URL;

const apiClient = axios.create({
  baseURL: apiUrl + 'user',
});


export const registerUser = async (userData) => {
    try{
        const response = await apiClient.post('/register', userData);
        return response;
    }
    catch(error){
        throw new Error(error.response && error.response.data ? JSON.stringify(error.response.data.error) : 'Unknown Error');
    }
};

export const login = async (userData) => {
    try{
        const response = await apiClient.post('/login', userData);
        return response;
    }
    catch(error){
        throw new Error(error.response && error.response.data ? JSON.stringify(error.response.data.error) : 'Unknown Error');
    }
};

export const updateProfile = async (userData) => {
    try{
        const response = await apiClient.put('/updateProfile', userData);
        return response;
    }
    catch(error){
        throw new Error(error.response && error.response.data ? JSON.stringify(error.response.data.error) : 'Unknown Error');
    }
};

export const deleteProfile = async (userData) => {
    try{
        const response = await apiClient.put('/deleteProfile', userData);
        return response;
    }
    catch(error){
        throw new Error(error.response && error.response.data ? JSON.stringify(error.response.data.error) : 'Unknown Error');
    }
};

export const changePassword = async (userId, newPassword) => {
    const userData = {
        "userId": userId,
        "newPassword": newPassword
     };
    try{
        const response = await apiClient.put('/changePassword', userData);
        return response;
    }
    catch(error){
        throw new Error(error.response && error.response.data ? JSON.stringify(error.response.data.error) : 'Unknown Error');
    }
};

export const checkEmailId = async (emailId) => {
    const userData = {
        "emailId": emailId
     };
    try{
        const response = await apiClient.post('/checkEmailId', userData);
        return response.data.exists;
    }
    catch(error){
        throw new Error(error.response && error.response.data ? JSON.stringify(error.response.data.error) : 'Unknown Error');
    }
};