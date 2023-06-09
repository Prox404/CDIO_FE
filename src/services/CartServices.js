import * as request from '~/utils/httpRequest';

export const addCart = async (product) => {
    try {
        console.log(product);
        const res = await request.post(`/cart/add-cart`, product);
        return res.data;
    } catch (error) {
        console.log(error)
        return undefined;
    }
}

export const getCart = async (id) => {
    try {
        const res = await request.get(`/cart/${id}`);
        return res;
    } catch (error) {
        console.log(error)
        return undefined;
    }
}