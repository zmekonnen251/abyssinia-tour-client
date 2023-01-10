import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../store/store';
import type { User } from '../../../types/models';
import API from '../../../services/httpService';
import { toast } from 'react-toastify';
// import decode from 'jwt-decode';
// import Cookies from 'js-cookie';

interface UserState {
	user: User | null;
	status: 'idle' | 'loading' | 'failed' | 'succeed' | 'userUpdated';
	error: string | null | undefined;
}

// Define the initial state using that type
const initialState = {
	user: null,
	status: 'idle',
	error: null,
} as UserState;

export const updateMe = createAsyncThunk(
	'user/updateMe',
	async (userData: User, thunkApi) => {
		console.log(userData);
		try {
			const {
				data: { user },
			} = await API.patch('/users/updateMe', userData);
			toast.success('Profile updated successfully');
			return user as User;
		} catch (error: any) {
			toast.error(error.response.data.message);
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

const usersSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// standard reducer logic, with auto-generated action types per reducer
	},
	extraReducers: (builder) => {
		builder
			.addCase(updateMe.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(updateMe.fulfilled, (state, action: PayloadAction<User>) => {
				state.status = 'succeed';
				state.user = action.payload;
			})
			.addCase(updateMe.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export default usersSlice.reducer;
