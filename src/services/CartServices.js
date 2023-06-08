import * as request from '~/utils/httpRequest';

export const addCart = async ({product}) => {
    try {
        const res = await request.post(`/cart/add-cart`, product);
        return res.data;
    } catch (error) {
        console.log(error)
        return undefined;
    }
}