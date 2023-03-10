import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { BookingModel } from '../../types/models';
import API from '../../services/httpService';
import { toast } from 'react-toastify';

interface BookingsState {
	bookings: BookingModel[];
	status: 'idle' | 'loading' | 'failed' | 'succeed';
	error: string | null | undefined;
}

// Define the initial state using that type
const initialState = {
	bookings: [],
	status: 'idle',
	error: null,
} as BookingsState;

export const getAllBookings = createAsyncThunk(
	'bookings/getAllBookings',
	async (data, thunkApi) => {
		try {
			const {
				data: { data },
			} = await API.get('/bookings');

			console.log(data);
			const bookings = data.map((booking) => {
				return { ...booking, id: data.indexOf(booking) };
			});
			return bookings as BookingModel[];
		} catch (err: any) {
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const getMyBookings = createAsyncThunk(
	'bookings/getMyBookings',
	async (data, thunkApi) => {
		try {
			const {
				data: {
					data: { bookings: data },
				},
			} = await API.get('/bookings/my-bookings');

			const bookings = data.map((booking) => {
				return { ...booking, id: data.indexOf(booking) + 1 };
			});
			return bookings as BookingModel[];
		} catch (err: any) {
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const deleteBooking = createAsyncThunk(
	'bookings/deleteBooking',
	async (id: string, thunkApi) => {
		try {
			await API.delete(`/bookings/${id}`);
			// console.log(data.data.data);
			return id as string;
		} catch (err: any) {
			// console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

const bookingsSlice = createSlice({
	name: 'bookings',
	initialState,
	reducers: {
		// standard reducer logic, with auto-generated action types per reducer
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllBookings.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				getAllBookings.fulfilled,
				(state, action: PayloadAction<BookingModel[]>) => {
					state.status = 'succeed';
					console.log(action.payload);
					state.bookings = action.payload;
				}
			)
			.addCase(getAllBookings.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(getMyBookings.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				getMyBookings.fulfilled,
				(state, action: PayloadAction<BookingModel[]>) => {
					state.status = 'succeed';
					console.log(action.payload);
					if (state.bookings.length === 0) {
						state.bookings = action.payload;
					}
				}
			)
			.addCase(getMyBookings.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(deleteBooking.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				deleteBooking.fulfilled,
				(state, action: PayloadAction<string>) => {
					state.status = 'succeed';
					state.bookings = state.bookings.filter(
						(booking) => booking._id !== action.payload
					);
					toast.success('Booking deleted successfully');
				}
			)
			.addCase(deleteBooking.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export const selectBookings = (state: RootState) => state.bookings.bookings;

export default bookingsSlice.reducer;
