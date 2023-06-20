// import { toast } from 'react-toastify';

import * as request from '~/utils/httpRequest';

export const search = async (name) => {
    try {
        const res = await request.get(`/products/search`, {
            params: {
                name
            }
        });
        return res.data;
    } catch (error) {
        console.log(error)
        return undefined;
    }
}

export const filter = async (params) => {
    try {
        const res = await request.get(`/products/search`, {
            params
        });
        return res.data;
    } catch (error) {
        console.log(error)
        return undefined;
    }
}

export const getProductById = async (id) => {
    try {
        const res = await request.get(`/products/get/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
        return undefined;
    }
}

export const getAllProducts = async () => {
    try {
        const res = await request.get(`/products`);
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const deleteProduct = async (id) => {
    try {
        const res = await request.del(`/products/${id}`);
        // console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}


export const updateProduct = async (id, params) => {
    try {
        const res = await request.put(`/products/update/${id}`, params);
        // console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const createProduct = async (params) => {
    try {
        const res = await request.post(`/products/add-product`, params);
        // console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}