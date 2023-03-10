import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../../app/store';
import type { User as UserModel } from '../../../../types/models';
import API from '../../../../services/httpService';
import { toast } from 'react-toastify';

// Define a type for the slice state
interface UsersState {
	users: UserModel[];
	status: 'idle' | 'loading' | 'failed' | 'succeed';
	error: string | null | undefined;
}

type UpdateData = {
	userData: FormData;
	_id: string;
	id: string;
};

// Define the initial state using that type
const initialState = {
	users: [],
	status: 'idle',
	error: null,
} as UsersState;

export const fetchUsers = createAsyncThunk(
	'reviews/fetchTourReviews',
	async (data, thunkApi) => {
		try {
			const {
				data: { data },
			} = await API.get(`/users`);
			const users = data.map((user) => {
				return { ...user, id: data.indexOf(user) + 1 };
			});

			return users as UserModel[];
		} catch (err: any) {
			// console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const deleteUser = createAsyncThunk(
	'users/deleteUser',
	async (id: string, thunkApi) => {
		try {
			await API.delete(`/users/${id}`);
			// console.log(data.data.data);
			return id as string;
		} catch (err: any) {
			// console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const updateUser = createAsyncThunk(
	'users/updateUser',
	async (data: UpdateData, thunkApi) => {
		try {
			const {
				data: { data: user },
			} = await API.patch(`/users/${data._id}`, data.userData);
			// console.log(data.data.data);

			return { ...user, id: data.id } as UserModel;
		} catch (err: any) {
			// console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

type CreateUserData = {
	name: string;
	email: string;
	password: string;
	passwordConfirm: string;
	role: 'admin' | 'user' | 'guide' | 'lead-guide' | 'intern';
};

export const createUser = createAsyncThunk(
	'users/createUser',
	async (data: CreateUserData, thunkApi) => {
		try {
			const {
				data: { data: user },
			} = await API.post(`/users`, data);
			// console.log(data.data.data);
			return user as UserModel;
		} catch (err: any) {
			// console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const usersSlice = createSlice({
	name: 'reviews',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				fetchUsers.fulfilled,
				(state, action: PayloadAction<UserModel[]>) => {
					state.status = 'succeed';
					state.users = action.payload;
				}
			)
			.addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(deleteUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
				state.status = 'succeed';

				state.users = state.users.filter((user) => user._id !== action.payload);
				toast.success('User deleted successfully');
			})
			.addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(updateUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				updateUser.fulfilled,
				(state, action: PayloadAction<UserModel>) => {
					state.status = 'succeed';
					state.users = state.users.map((user) =>
						user._id === action.payload._id ? action.payload : user
					);
					toast.success('User updated successfully');
				}
			)
			.addCase(updateUser.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(createUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				createUser.fulfilled,
				(state, action: PayloadAction<UserModel>) => {
					state.status = 'succeed';
					const user = {
						...action.payload,
						id: (state.users.length + 1).toString(),
					};
					state.users = [...state.users, user];
					toast.success('User created successfully');
				}
			)
			.addCase(createUser.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

// export const { getAllTours } = toursSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getAllUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
