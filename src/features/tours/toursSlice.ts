import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { TourModel } from '../../types/models';
import API from '../../services/httpService';
import { toast } from 'react-toastify';

// Define a type for the slice state
interface ToursState {
	tours: TourModel[];
	tour: TourModel | null;
	status: 'idle' | 'loading' | 'failed' | 'succeed';
	error: string | null | undefined;
}

// Define the initial state using that type
const initialState = {
	tours: [],
	tour: null,
	status: 'idle',
	error: null,
} as ToursState;

export const fetchTours = createAsyncThunk(
	'tours/fetchTours',
	async (data, thunkApi) => {
		try {
			const {
				data: { data },
			} = await API.get('/tours');
			const tours = data.map((tour) => {
				return { ...tour, id: data.indexOf(tour) + 1 };
			});

			return tours as TourModel[];
		} catch (err: any) {
			// console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

type CreateTourData = {
	name: string;
	description?: string;
	summary: string;
	duration: number;
	startDates: Date[];
	maxGroupSize: number;
	price: number;
};

export const createTour = createAsyncThunk(
	'tours/create',
	async (tourData: CreateTourData, thunkApi) => {
		try {
			const { data } = await API.post('/tours', tourData);
			return data.data.data as TourModel;
		} catch (err: any) {
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export type UpdateTourData = {
	tourData: FormData;
	_id: string;
	id: string;
};

export const updateTour = createAsyncThunk(
	'tours/update',
	async (data: UpdateTourData, thunkApi) => {
		const { _id, id, tourData } = data;
		try {
			const { data: tour } = await API.patch(`/tours/${_id}`, tourData);
			return { ...tour, id } as TourModel;
		} catch (err: any) {
			console.log(err);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const fetchTour = createAsyncThunk(
	'tours/fetchTour',
	async (id: string, thunkApi) => {
		try {
			const { data } = await API.get(`/tours/${id}`);
			return data.data.data as TourModel;
		} catch (err: any) {
			// console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const deleteTour = createAsyncThunk(
	'tours/deleteTour',
	async (id: string, thunkApi) => {
		try {
			await API.delete(`/tours/${id}`);
			return id as string;
		} catch (err: any) {
			// console.log(err.response.data.message);
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
					// console.log(state);

					state.status = 'succeed';
					state.tours = action.payload;
					// console.log(action.payload);
				}
			)
			.addCase(fetchTours.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(createTour.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				createTour.fulfilled,
				(state, action: PayloadAction<TourModel>) => {
					state.status = 'succeed';
					const tour = {
						...action.payload,
						id: (state.tours.length + 1).toString(),
					};
					state.tours = [...state.tours, tour];
				}
			)
			.addCase(createTour.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(fetchTour.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				fetchTour.fulfilled,
				(state, action: PayloadAction<TourModel>) => {
					state.status = 'succeed';
					state.tour = action.payload;
				}
			)
			.addCase(fetchTour.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(updateTour.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				updateTour.fulfilled,
				(state, action: PayloadAction<TourModel>) => {
					state.status = 'succeed';
					state.tours[action.payload.id] = action.payload;

					toast.success('Tour updated successfully');
				}
			)
			.addCase(updateTour.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
				toast.error('Tour update failed');
			})
			.addCase(deleteTour.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(deleteTour.fulfilled, (state, action: PayloadAction<string>) => {
				state.status = 'succeed';
				state.tours = state.tours.filter((tour) => tour._id !== action.payload);
				toast.success('Tour deleted successfully');
			})
			.addCase(deleteTour.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
				toast.error('Tour delete failed');
			});
	},
});

// export const { getAllTours } = toursSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAllTours = (state: RootState) => state.tours.tours;
export const selectTour = (state: RootState) => state.tours.tour;

export default toursSlice.reducer;
