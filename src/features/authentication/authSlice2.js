import { createSlice } from '@reduxjs/toolkit';
// import type { RootState } from '../../app/store';

// interface AuthState {
// 	token: string | null;
// }

// const initialState: AuthState = {
// 	token: null,
// };

// interface Credentials {
// 	accessToken: string;
// }

const authSlice = createSlice({
	name: 'auth',
	initialState: { token: null },
	reducers: {
		setCredentials: (state, action) => {
			console.log(
				'setCredentials action.payload: ',
				action.payload.accessToken
			);
			const { accessToken } = action.payload;
			state.token = accessToken;
		},
		logOut: (state) => {
			state.token = null;
		},
	},
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
