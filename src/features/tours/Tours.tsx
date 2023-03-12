import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTours, selectAllTours } from './toursSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Tour from './Tour';

const Tours = () => {
	const tours = useAppSelector(selectAllTours);
	const publicTours = tours.filter((tour) => tour.public === true);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchTours());
	}, [dispatch]);

	useEffect(() => {
		const query = new URLSearchParams(window.location.search);

		if (query.get('canceled')) {
			toast.error(
				"Order canceled -- continue to shop around and checkout when you're ready."
			);
		}
	}, [navigate]);

	return (
		<>
			<div className='card-container'>
				{publicTours &&
					publicTours.map((tour) => <Tour key={tour.id} tour={tour} />)}
			</div>
		</>
	);
};

export default Tours;
