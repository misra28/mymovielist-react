import axios from 'axios';
import getDjangoEndpoint from '../django-endpoint';
import CryptoJS from 'crypto-js';
import useCredentialsQueryStore from '../credentialsStore';

const API_URL = getDjangoEndpoint();
const ENCRYPTION_KEY = 'your-encryption-key';

const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}auth/jwt/create`, {
            username,
            password,
        });
        if (response.data.access && response.data.refresh) {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            axios.defaults.headers.common['Authorization'] = `JWT ${response.data.access}`;
        }
        return response.data;
    } catch (error) {
        console.error("Login failed", error);
        throw error;
    }
};

const encryptPassword = (password: string): string => {
    return CryptoJS.AES.encrypt(password, ENCRYPTION_KEY).toString();
};
  
const register = async (email: string, username: string, password: string) => {
    console.log('Email: ', email);
    console.log('Username: ', username);
    console.log('Unencrypted password: ', password);
    try {
        const encryptedPassword = encryptPassword(password);
        console.log('Encrypted password: ', encryptedPassword);
        await axios.post(`${API_URL}auth/users/`, {
            email,
            username,
            password: encryptedPassword,
        });
        return login(username, encryptedPassword);
    } catch (error) {
        console.error('Registration failed', error);
        throw error;
    }
};

const refreshToken = async () => {
    try {
        const refresh_token = localStorage.getItem('refresh_token');
        const response = await axios.post(`${API_URL}auth/jwt/refresh/`, {
            refresh: refresh_token,
        });
        if (response.data.access) {
            localStorage.setItem('access_token', response.data.access);
            axios.defaults.headers.common['Authorization'] = `JWT ${response.data.access}`;
        }
        return response.data;
    } catch (error) {
        console.error("Token refresh failed", error);
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete axios.defaults.headers.common['Authorization'];
};

const deleteAccount = async () => {
    try {
        await axios.delete(`${API_URL}auth/users/me/`);
    } catch (error) {
        console.error("Account deletion failed", error);
        throw error;
    }
    logout();
}

export default {
    login,
    refreshToken,
    logout,
    register,
    deleteAccount,
};
