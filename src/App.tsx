import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import AllTours from './pages/AllTours';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './features/authentication/ForgotPassword';
import Profile from './features/profile/Profile';
import MyBookings from './features/profile/MyBookings';

import ProtectedRoute from './features/authentication/ProtectedRoute';
import ResetPassword from './features/authentication/ResetPassword';
import TourDetails from './features/tours/TourDetails';

import ProtectedRouteAdmin from './features/authentication/ProtectedRouteAdmin';
import AdminHome from './features/admin/pages/home/Home';
import UsersList from './pages/UsersList';
import ToursList from './pages/ToursList';
import BookingsList from './pages/BookingsList';

import Single from './features/admin/pages/single/Single';
import CreateNewUser from './pages/CreateNewUser';
import CreateNewTour from './pages/CreateNewTour';

import UserDetailsView from './pages/UserDetailsView';
import UpdateUser from './pages/UpdateUser';
import UpdateTour from './pages/UpdateTour';

import useAuth from './hooks/useAuth';

function App() {
	const {isLoggedIn} = useAuth()

	return (
		<>
			<ToastContainer />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route
					path='/login'
					element={isLoggedIn ? <Navigate to='/profile' /> : <Login />}
				/>
				<Route path='/signup' element={<SignUp />} />
				<Route path='/profile' element={<ProtectedRoute />}>
					<Route index element={<Profile />} />
					<Route path='my-bookings' element={<MyBookings />} />
				</Route>

				{/* <Route index element={<AdminDashboard />} />
				</Route> */}

				<Route path='/dashboard' element={<ProtectedRouteAdmin />}>
					<Route index element={<AdminHome />} />

					<Route path='users'>
						<Route index element={<UsersList />} />
						<Route path=':userId' element={<UserDetailsView />} />
						<Route path='edit/:userId' element={<UpdateUser />} />
						<Route path='new' element={<CreateNewUser />} />
					</Route>

					<Route path='tours'>
						<Route index element={<ToursList />} />
						<Route path=':tourSlug' element={<Single />} />
						<Route path='edit/:tourId' element={<UpdateTour />} />
						<Route path='new' element={<CreateNewTour />} />
					</Route>

					<Route path='bookings'>
						<Route index element={<BookingsList />} />
					</Route>
				</Route>

				<Route path='/tours' element={<AllTours />} />
				{/* <Route path={'/tours/:slug'} element={<TourDetails />} /> */}
				<Route path='/tours/:tourId' element={<TourDetails />} />
				<Route path='/resetPassword/:resetToken' element={<ResetPassword />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
			</Routes>
		</>
	);
}

export default App;
