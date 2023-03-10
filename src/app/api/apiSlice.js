import {
	BaseQueryFn,
	createApi,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../../features/authentication/authSlice2';

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:5000/api/v1',
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;

		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
	// console.log(args) // request url, method, body
	// console.log(api) // signal, dispatch, getState()
	// console.log(extraOptions) //custom like {shout: true}
	console.log('baseQueryWithReauth');
	let result = await baseQuery(args, api, extraOptions);

	// If you want, handle other status codes, too
	if (result?.error?.status === 403) {
		console.log('sending refresh token');

		// send refresh token to get new access token
		const refreshResult = await baseQuery('/users/refresh', api, extraOptions);

		if (refreshResult?.data.accessToken) {
			// store the new token
			api.dispatch(setCredentials({ ...refreshResult.data.accessToken }));

			// retry original query with new access token
			result = await baseQuery(args, api, extraOptions);
		} else {
			if (refreshResult?.error?.status === 403) {
				refreshResult.error.data.message = 'Your login has expired.';
			}
			return refreshResult;
		}
	}

	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	tagTypes: ['User', 'Tour', 'Review', 'Booking'],
	endpoints: (builder) => ({}),
});
