import * as request from '~/utils/httpRequest';

export const getAllUser = async () => {
    try {
        const res = await request.get(`/users`);
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}
export const getAllUserByRole = async (id) => {
    try {
        const res = await request.get(`/users/get/all/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const deleteUser = async (id) => {
    try {
        const res = await request.get(`/users/delete/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const addEmployee = async (params) => {
    try {
        const res = await request.post(`/users/add-employee`, params);
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const updateUser = async (id, params) => {
    try {
        const res = await request.put(`/users/update/${id}`, params);
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getUser = async (id) => {
    try {
        const res = await request.get(`/users/get/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}