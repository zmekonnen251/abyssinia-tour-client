import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getMyBookings, selectBookings } from '../tours/bookingsSlice';
import { fetchTours, selectAllTours } from '../tours/toursSlice';
import ProfileSideBar from './ProfileSideBar';
import Header from '../../layouts/Header/Header';
import Tour from '../tours/Tour';
import { TourModel } from '../../types/models';
import { toast } from 'react-toastify';

const MyBookings = () => {
	const dispatch = useAppDispatch();

	const tours = useAppSelector(selectAllTours);
	const bookings = useAppSelector(selectBookings);
	const myBookingsTours = bookings.map((booking) => booking.tour?._id as any);
	const myBookings = tours.filter((tour: TourModel) =>
		myBookingsTours.includes(tour?._id)
	);

	useEffect(() => {
		const query = new URLSearchParams(window.location.search);

		if (query.get('success')) {
			toast.success('Order placed! You will receive an email confirmation.');
		}

		dispatch(getMyBookings());
		dispatch(fetchTours());
	}, [dispatch]);

	console.log('myBookings', myBookings);
	return (
		<>
			<Header />

			<div className='user-view'>
				<ProfileSideBar />
				<div className='user-view__content'>
					<div className='user-view__content--bookings'>
						{myBookings &&
							myBookings.map((tour) => <Tour key={tour.id} tour={tour} />)}
					</div>
				</div>
			</div>
		</>
	);
};

export default MyBookings;
