import axios from "axios";

const apiBlog = axios.create({
    baseURL: 'http://127.0.0.1:3001/blogDeAprendizaje/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const frontBlog = async (formData) => {
    try {
        return await apiBlog.post('/', formData); 
    } catch (error) {
        return {
            error: true,
            message: error.response?.data || "Error desconocido",
        };
    }
};

export const listarPublicaciones = async () => {
    try {
        const response = await apiBlog.get('publicaciones/'); 
        return {
            error: false,
            data: response.data,
        };
    } catch (error) {
        return {
            error: true,
            message: error.response?.data || "Error desconocido",
        };
    }
};