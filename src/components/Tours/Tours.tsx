import React, { useState } from 'react';
import { TourData } from '../../types';
import TourPopup from '../TourPopup/TourPopup';
import Tour from './Tour/Tour';

type ToursProps = {
	tours: TourData[];
};

const Tours = ({ tours }: ToursProps) => {
	const [showPopup, setShowPopup] = useState(false);
	const [popupTour, setPopupTour] = useState({} as TourData);

	const handleShowPopup = (tour: TourData) => {
		if (showPopup) {
			setShowPopup(false);
		} else {
			setShowPopup(true);
			setPopupTour(tour);
		}
	};

	return (
		<>
			<section className='section-tours'>
				<div className='u_padding_top_small' id='tours'>
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
				</div>
			</section>

			<TourPopup show={showPopup} onClose={handleShowPopup} tour={popupTour} />
		</>
	);
};

export default Tours;
