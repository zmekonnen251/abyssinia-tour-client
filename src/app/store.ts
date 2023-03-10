import { configureStore } from '@reduxjs/toolkit';
import toursReducer from '../features/tours/toursSlice';
import reviewReducer from '../features/reviews/reviewsSlice';
import usersReducer from '../features/admin/components/users/usersSlice';
import bookingsSlice from '../features/tours/bookingsSlice';
import authReducer from '../features/authentication/authSlice';
// ...

export const store = configureStore({
	reducer: {
		auth: authReducer,
		reviews: reviewReducer,
		tours: toursReducer,
		users: usersReducer,
		bookings: bookingsSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
