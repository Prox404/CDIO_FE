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

export const getAllOrders = async () => {
    try {
        const res = await request.get(`/order/get/pending-order`);
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getOrderDetails = async (id) => {
    try {
        const res = await request.get(`/order/get/order-detail/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const setPreparing = async (id) => {
    try {
        const res = await request.put(`/order/set/preparing/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const setDelivering = async (id) => {
    try {
        const res = await request.put(`/order/set/delivering/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const setDelivered = async (id) => {
    try {
        const res = await request.put(`/order/set/delivered/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}