import axios from 'axios';

const apiUrl = process.env.REACT_APP_BASE_URL;

const apiClient = axios.create({
  baseURL: apiUrl + 'review',
});

export const saveReview = async(reviewData) => {
    try{
        const response = await apiClient.post('/save', reviewData);
        return response;
    }
    catch(error){
        throw new Error(error.response && error.response.data ? JSON.stringify(error.response.data.error) : 'Unknown Error');
    }
}