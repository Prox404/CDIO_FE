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

export const deleteUser = async (id) => {
    try {
        const res = await request.get(`/users/delete/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}