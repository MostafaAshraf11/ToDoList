import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/user';

  export const register = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/register`, userData).then((res) => {
        return res.data;
    }).catch((error) => {
        return error.response.data;
    });
    return response.data;
};