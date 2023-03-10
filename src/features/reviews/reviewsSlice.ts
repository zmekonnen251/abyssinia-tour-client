import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { ReviewModel } from '../../types/models';
import API from '../../services/httpService';
import { toast } from 'react-toastify';

// Define a type for the slice state
interface ReviewsState {
	reviews: ReviewModel[];
	status: 'idle' | 'loading' | 'failed' | 'succeed';
	error: string | null | undefined;
}

// Define the initial state using that type
const initialState = {
	reviews: [],
	status: 'idle',
	error: null,
} as ReviewsState;

export const fetchTourReviews = createAsyncThunk(
	'reviews/fetchTourReviews',
	async (tourId: string, thunkApi) => {
		try {
			const {
				data: { data },
			} = await API.get(`/tours/${tourId}/reviews`);
			return data as ReviewModel[];
		} catch (err: any) {
			// console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

type CreateReviewData = {
	tourId: string;
	rating: number;
	review: string;
};

export const createReview = createAsyncThunk(
	'reviews/createReview',
	async (reviewData: CreateReviewData, thunkApi) => {
		try {
			console.log(reviewData);
			const {
				data: { data },
			} = await API.post(`/tours/${reviewData?.tourId}/reviews`, {
				rating: reviewData?.rating,
				review: reviewData?.review,
			});
			console.log(data);
			return data as ReviewModel;
		} catch (err: any) {
			// console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const reviewsSlice = createSlice({
	name: 'reviews',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTourReviews.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				fetchTourReviews.fulfilled,
				(state, action: PayloadAction<ReviewModel[]>) => {
					state.status = 'succeed';
					state.reviews = action.payload;
				}
			)
			.addCase(
				fetchTourReviews.rejected,
				(state, action: PayloadAction<any>) => {
					state.status = 'failed';
					state.error = action.payload;
				}
			)
			.addCase(createReview.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				createReview.fulfilled,
				(state, action: PayloadAction<ReviewModel>) => {
					state.status = 'succeed';
					state.reviews.push(action.payload);
					toast.success('Review Added successfully');
				}
			)
			.addCase(createReview.rejected, (state, action: PayloadAction<any>) => {
				state.status = 'failed';
				state.error = action.payload;
				toast.error(action.payload);
			});
	},
});

// export const { getAllTours } = toursSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAllReviews = (state: RootState) => state.reviews.reviews;

export default reviewsSlice.reducer;
