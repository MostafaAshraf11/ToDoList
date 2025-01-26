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


export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, userData);
        console.log(response.data);
        if (response.data.token && response.data.user) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.user.id);
        }
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
