import axios from 'axios';

const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (path, data, options = {}) => {
    console.log("path: ", path);
    console.log("data: ", data);
    const response = await httpRequest.post(path, data);
    return response.data;
};

export const put = async (path, data, options = {}) => {
    const response = await httpRequest.put(path, data, options);
    return response.data;
};

export const del = async (path, options = {}) => {
    const response = await httpRequest.delete(path, options);
    return response.data;
};

httpRequest.interceptors.request.use(function (config) {
    const accessToken =
        "Bearer " + localStorage.getItem("accessToken") ?? "";
    if (accessToken) {
        config.headers.Authorization = accessToken;
    }
    return config;
});

export default httpRequest;