import * as request from '~/utils/httpRequest';

export const login = async ({params}) => {
    try {
        const res = await request.post(`/auth/login`, params);
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const register = async ({params}) => {
    try {
        const res = await request.post(`/auth/signup`, params);
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const logout = async (params) => {
    try {
        const res = await request.post(`/auth/logout`, params);
        return res.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}