import { api } from "./base";
import * as SecureStore from 'expo-secure-store';

const userAPI = api.injectEndpoints({
    endpoints: (build) => ({
        checkAuth: build.query({
            query: () => '/users/me/',
            providesTags: ['Auth'],
        }),
        register: build.mutation({
            query: (registerData) => ({
                url: '/users/',
                method: 'POST',
                body: registerData
            })
        }),
        login: build.mutation({
            query: loginData => ({
                url: '/users/token/',
                method: 'POST',
                body: loginData
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch } ) {
                try {
                    const { data } = await queryFulfilled;
                    await SecureStore.setItemAsync('accessToken', data.access);
                    await SecureStore.setItemAsync('refreshToken', data.refresh);
                    dispatch(api.util.invalidateTags(['Auth']));
                }
                catch(e) {
                    console.log(e)
                }
            }
        }),
        logout: build.mutation({
            query: logoutData => ({
                url: '/users/token/blacklist/',
                method: 'POST',
                body: logoutData
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    await SecureStore.deleteItemAsync('accessToken');
                    await SecureStore.deleteItemAsync('refreshToken');
                    dispatch(api.util.invalidateTags(['Auth']));
                }
                catch(e) {
                    console.log(`Error from logout mutation: ${e}`)
                }
            }
        })
    })
});

export const { useCheckAuthQuery, useLoginMutation, useLogoutMutation, useRegisterMutation } = userAPI;

export const { endpoints: { checkAuth, login } } = userAPI;
