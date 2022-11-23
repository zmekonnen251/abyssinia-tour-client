import React from 'react';
import { TourData } from '../../types';
import Tour from './Tour/Tour';
import styles from './Tours.module.scss';

type ToursProps = {
	tours: TourData[];
};

const Tours = ({ tours }: ToursProps) => {
	return (
		<section className={styles.sectionTours}>
			<div className='u_center_text u_margin_bottom_big'>
				<h2 className='heading-secondary'>Most popular tours</h2>
			</div>

			<div className='row'>
				{tours.map((tour) => (
					<Tour key={tour.id} tour={tour} />
				))}
			</div>

			<div className='u_center_text u_margin_top_huge'>
				<a href='#ab' className='btn btn--green'>
					Discover all tours
				</a>
			</div>
		</section>
	);
};

export default Tours;
