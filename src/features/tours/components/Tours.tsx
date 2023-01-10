import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchTours, selectAllTours } from './toursSlice';
import Header from '../../../layouts/Header/Header';
import Tour from './Tour';
import { toast } from 'react-toastify';

const Tours = () => {
	const allTours = useAppSelector(selectAllTours);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchTours());
	}, [dispatch]);

	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		const query = new URLSearchParams(window.location.search);

		if (query.get('success')) {
			toast.success('Order placed! You will receive an email confirmation.');
		}

		if (query.get('canceled')) {
			toast.error(
				"Order canceled -- continue to shop around and checkout when you're ready."
			);
		}
	}, []);

	return (
		<>
			<div className='card-container'>
				{allTours && allTours.map((tour) => <Tour key={tour.id} tour={tour} />)}
			</div>
		</>
	);
};

export default Tours;
