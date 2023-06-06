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
