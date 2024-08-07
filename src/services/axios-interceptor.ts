import axios from 'axios';
import authService from './auth-service';

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await authService.refreshToken();
                return axios(originalRequest);
            } catch (err) {
                console.error('Token refresh failed', err);
                authService.logout();
                window.location.href = '/user';
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);
