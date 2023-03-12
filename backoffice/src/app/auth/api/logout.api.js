import axios from '@/config/axios';

export const logout = async () => {
    const response = await axios.request({
        method: 'POST',
        url: '/auth/logout',
    });
    return response.data;
};
