import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import AllTours from './pages/AllTours';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './features/authentication/components/ForgotPassword';
import Profile from './features/authentication/components/Profile';
import ProtectedRoute from './features/authentication/ProtectedRoute';
import ResetPassword from './features/authentication/components/ResetPassword';
import TourDetails from './features/tours/components/TourDetails';

import { currentUser } from './features/authentication/components/authSlice';
import { useAppSelector } from './store/hooks';

function App() {
	const user = useAppSelector(currentUser);

	return (
		<>
			<ToastContainer />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route
					path='/login'
					element={user ? <Navigate to='/profile' /> : <Login />}
				/>
				<Route path='/signup' element={<SignUp />} />
				<Route path='/profile' element={<ProtectedRoute />}>
					<Route path='/profile' element={<Profile />} />
				</Route>
				<Route path='/profile' element={<Profile />} />
				<Route path='/tours' element={<AllTours />} />
				<Route path='/tours/:slug' element={<TourDetails />} />
				<Route path='/resetPassword/:resetToken' element={<ResetPassword />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
			</Routes>
		</>
	);
}

export default App;
