import { apiSlice } from '../../app/api/apiSlice';
import { logOut, setCredentials } from './authSlice2';

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: '/users/login',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
		sendLogout: builder.mutation({
			query: () => ({
				url: '/users/logout',
				method: 'DELETE',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					console.log(data);
					dispatch(logOut());
					setTimeout(() => {
						dispatch(apiSlice.util.resetApiState());
					}, 1000);
				} catch (err) {
					console.log(err);
				}
			},
		}),
		refresh: builder.mutation({
			query: () => ({
				url: '/users/refresh',
				method: 'GET',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					console.log(data);
					const { accessToken } = data;
					dispatch(setCredentials({ accessToken }));
				} catch (err) {
					console.log(err);
				}
			},
		}),
	}),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
	authApiSlice;
