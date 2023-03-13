import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { User } from '../../types/models';
import API from '../../services/httpService';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// Define a type for the slice state
export type UserData = {
	user: User | null;
	status: 'success' | 'failed';
};
interface UserState {
	user: UserData | null;
	status:
		| 'idle'
		| 'loading'
		| 'failed'
		| 'succeed'
		| 'loggedOut'
		| 'password-reseted'
		| 'userUpdated';
	error: string | null | undefined;
}

// Define the initial state using that type
const initialState = {
	user: null,
	status: 'idle',
	error: null,
} as UserState;

type loginData = {
	email: string;
	password: string;
	navigate: (path: string) => void;
};
type PasswordData = {
	password: string;
	passwordConfirm: string;
	passwordCurrent?: string;
};

type signUpData = {
	email: string;
	name: string;
} & PasswordData;

type resetData = {
	resetToken: string;
	password: string;
	passwordConfirm: string;
};

export const login = createAsyncThunk(
	'users/login',
	async (userData: loginData, thunkApi) => {
		try {
			const { email, password, navigate } = userData;
			const { data } = await API.post('/users/login', {
				email,
				password,
			});

			if (data?.user?.role === 'admin') {
				navigate('/dashboard');
			} else {
				navigate('/profile');
			}
			return data as UserData;
		} catch (err: any) {
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

type logoutData = {
	navigate: (path: string) => void;
};

export const logout = createAsyncThunk(
	'users/logout',
	async (data: logoutData, thunkApi) => {
		try {
			const response = await API.delete('/users/logout');
			if (response.status === 200) {
				data.navigate('/login');
				return null;
			}
		} catch (err: any) {
			// console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const signup = createAsyncThunk(
	'users/signup',
	async (userInfo: signUpData, thunkApi) => {
		try {
			const { data } = await API.post('/users/signup', userInfo);
			// console.log(data);
			return data as UserData;
		} catch (err: any) {
			// console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const resetPassword = createAsyncThunk(
	'users/resetPassword',
	async (resetPasswordInfo: resetData, thunkApi) => {
		const { resetToken, password, passwordConfirm } = resetPasswordInfo;
		try {
			const { data } = await API.patch(`/users/resetPassword/${resetToken}`, {
				password,
				passwordConfirm,
			});
			toast.success('Password reset successfully');

			return data as UserData;
		} catch (err: any) {
			// console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const forgotPassword = createAsyncThunk(
	'users/forgotPassword',
	async (email: string, thunkApi) => {
		try {
			const { data } = await API.post('/users/forgotPassword', {
				email,
			});
			toast.success('Password reset link sent to your email');
			return data as UserData;
		} catch (err: any) {
			// console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const updatePassword = createAsyncThunk(
	'users/updatePassword',
	async (passwordData: PasswordData, thunkApi) => {
		console.log(passwordData);
		try {
			const { data } = await API.patch('/users/updateMyPassword', passwordData);
			toast.success('Password updated successfully');
			return data as UserData;
		} catch (err: any) {
			// console.log(err.response.data.message);
			toast.error('Unexpected error happened!');
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const updateMe = createAsyncThunk(
	'user/updateMe',
	async (userData: FormData, thunkApi) => {
		console.log(userData);
		try {
			const { data } = await API.patch('/users/updateMe', userData);
			console.log(data);
			toast.success('Profile updated successfully');

			return data as UserData;
		} catch (error: any) {
			toast.error(error.response.data.message);
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const authSlice = createSlice({
	name: 'auth',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(login.fulfilled, (state, action: PayloadAction<UserData>) => {
				state.status = 'succeed';
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(signup.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(signup.fulfilled, (state, action: PayloadAction<UserData>) => {
				// console.log(state);

				state.status = 'succeed';
				state.user = action.payload;
				// console.log(action.payload);
			})
			.addCase(signup.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(logout.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(logout.fulfilled, (state, action: PayloadAction<any>) => {
				state.status = 'loggedOut';
				state.user = action.payload;
				Cookies.remove('accessToken');
			})
			.addCase(logout.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(resetPassword.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				resetPassword.fulfilled,
				(state, action: PayloadAction<UserData>) => {
					state.status = 'password-reseted';
					state.user = action.payload;
				}
			)
			.addCase(resetPassword.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(forgotPassword.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				forgotPassword.fulfilled,
				(state, action: PayloadAction<UserData>) => {
					state.status = 'succeed';
					state.user = null;
				}
			)
			.addCase(forgotPassword.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(updateMe.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(updateMe.fulfilled, (state, action: PayloadAction<UserData>) => {
				state.status = 'userUpdated';
				state.user = action.payload;
				console.log(state);
			})
			.addCase(updateMe.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export const currentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
