import React, { useState } from 'react';
import { TourData } from '../../types';
import TourPopup from '../TourPopup/TourPopup';
import Tour from './Tour/Tour';
import styles from './Tours.module.scss';

type ToursProps = {
	tours: TourData[];
};

const Tours = ({ tours }: ToursProps) => {
	const [showPopup, setShowPopup] = useState(false);

	const handleShowPopup = () => {
		setShowPopup(!showPopup);
	};

	return (
		<>
			<section className={styles.sectionTours} id='tours'>
				<div className='u_center_text u_margin_bottom_big'>
					<h2 className='heading-secondary'>Most popular tours</h2>
				</div>

				<div className='row'>
					{tours.map((tour) => (
						<Tour key={tour.id} tour={tour} onShow={handleShowPopup} />
					))}
				</div>

				<div className='u_center_text u_margin_top_huge'>
					<a href='#ab' className='btn btn--green'>
						Discover all tours
					</a>
				</div>
			</section>
			<TourPopup show={showPopup} onClose={handleShowPopup} />
		</>
	);
};

export default Tours;
