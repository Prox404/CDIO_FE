import * as request from '~/utils/httpRequest';

export const addOrder = async (params) => {
    try {
        console.log(params);
        const res = await request.post(`/order/add-order`, params);
        return res.data;
    } catch (error) {
        console.log(error)
        return undefined;
    }
}

export const getOrder = async (id) => {
    try {
        const res = await request.get(`/order/${id}`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error)
        return undefined;
    }
}