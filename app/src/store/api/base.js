import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';

const baseQuery = fetchBaseQuery({
    baseUrl: "http://192.168.43.160:80/api",
    prepareHeaders: async (headers) => {
        const accessToken = await SecureStore.getItemAsync('accessToken');
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let response = await baseQuery(args, api, extraOptions);
    if (response.error && response.error.status === 401) {
        await SecureStore.deleteItemAsync('accessToken');
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        if (!refreshToken) {
            return response;            
        }
        try {
            const refreshResponse = await baseQuery(
                {
                    url: '/users/token/refresh/',
                    method: 'POST',
                    body: {
                        refresh: refreshToken
                    }
                },
                api,
                extraOptions
            );
            await SecureStore.setItemAsync('accessToken', refreshResponse.data.access);
            response = await baseQuery(args, api, extraOptions);
        }
        catch(e) {
            console.log(e);
        }
    }
    return response;
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Auth', 'Posts', 'Comments'],
    endpoints: () => ({})
});
