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
        }),
        searchUser: build.query({
            query: (params) => `/users/?page=${params.page}&search=${params.searchParam}`,
            transformResponse: (response, _, arg) => {
                return Object.assign(response, arg)
            },
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                return `${endpointName}-${queryArgs.searchParam}`
            },
            merge: (currentCache, newItems, { arg }) => {
                if (currentCache?.page && currentCache.page >= arg.page && currentCache.searchParam === arg.searchParam) {
                    console.log('skip');
                    return;
                }
                currentCache.results.push(...newItems.results)
                currentCache.next = newItems.next;
                currentCache.page = newItems.page;
                currentCache.searchParam = newItems.searchParam;
            },
            forceRefetch({currentArg, previousArg, endpointState}) {
                if (!previousArg) { 
                    return true;
                }
                return endpointState.data.page <= currentArg.page && endpointState.data.searchParam !== currentArg.searchParam;
            }
        })
    })
});

export const { useCheckAuthQuery, useLoginMutation, useLogoutMutation, useRegisterMutation, useSearchUserQuery, useLazySearchUserQuery } = userAPI;

export const { endpoints: { checkAuth, login } } = userAPI;
