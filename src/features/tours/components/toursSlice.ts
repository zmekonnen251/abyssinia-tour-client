import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../store/store';
import type { TourModel } from '../../../types/models';
import API from '../../../services/httpService';

// Define a type for the slice state
interface ToursState {
	tours: TourModel[];
	status: 'idle' | 'loading' | 'failed' | 'succeed';
	error: string | null | undefined;
}

// Define the initial state using that type
const initialState = {
	tours: [],
	status: 'idle',
	error: null,
} as ToursState;

export const fetchTours = createAsyncThunk(
	'tours/fetchTours',
	async (data, thunkApi) => {
		try {
			const { data } = await API.get('/tours');
			console.log(data.data.data);
			return data.data.data as TourModel[];
		} catch (err: any) {
			console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const fetchTour = createAsyncThunk(
	'tours/fetchTour',
	async (id: string, thunkApi) => {
		try {
			const { data } = await API.get(`/tours/${id}`);
			console.log(data.data.data);
			return data.data.data as TourModel;
		} catch (err: any) {
			console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const toursSlice = createSlice({
	name: 'tours',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTours.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				fetchTours.fulfilled,
				(state, action: PayloadAction<TourModel[]>) => {
					console.log(state);

					state.status = 'succeed';
					state.tours = action.payload;
					console.log(action.payload);
				}
			)
			.addCase(fetchTours.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

// export const { getAllTours } = toursSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAllTours = (state: RootState) => state.tours.tours;

export default toursSlice.reducer;
