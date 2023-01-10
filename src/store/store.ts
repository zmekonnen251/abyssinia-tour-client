import { configureStore } from '@reduxjs/toolkit';
import toursReducer from '../features/tours/components/toursSlice';
import authReducer from '../features/authentication/components/authSlice';
import reviewReducer from '../features/tours/components/reviewsSlice';
import usersReducer from '../features/authentication/components/usersSlice';
// ...

export const store = configureStore({
	reducer: {
		auth: authReducer,
		reviews: reviewReducer,
		tours: toursReducer,
		users: usersReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
