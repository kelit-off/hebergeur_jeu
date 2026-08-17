import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // à garder si ton backend utilise des cookies httpOnly pour le refresh token
});

// Injecte le token d'authentification sur chaque requête sortante
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Gère les erreurs globales, notamment le 401 (session expirée)
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (typeof window !== "undefined") {
                localStorage.removeItem("accessToken");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;