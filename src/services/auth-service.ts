import axios from 'axios';
import getDjangoEndpoint from '../django-endpoint';
import useCredentialsQueryStore from '../credentialsStore';

const API_URL = getDjangoEndpoint();

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

const register = async (email: string, username: string, password: string) => {
    try {
        await axios.post(`${API_URL}auth/users/`, {
            email,
            username,
            password,
        });
        const response = login(username, password);
        return response;
    } catch (error) {
        console.error("Registration failed", error);
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
