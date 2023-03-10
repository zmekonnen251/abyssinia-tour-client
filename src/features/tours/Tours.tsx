import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTours, selectAllTours } from './toursSlice';

import Tour from './Tour';

const Tours = () => {
	const tours = useAppSelector(selectAllTours);
	const publicTours = tours.filter((tour) => tour.public === true);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchTours());
	}, [dispatch]);

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
