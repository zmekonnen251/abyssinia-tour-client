import React, { useState } from 'react';
import { FeaturedTourData } from '../../types/models';
import TourPopup from '../TourPopup/TourPopup';
import Tour from './FeaturedTour';
import { Link } from 'react-router-dom';

type FeaturedToursProps = {
	tours: FeaturedTourData[];
};

const FeaturedTours = ({ tours }: FeaturedToursProps) => {
	const [showPopup, setShowPopup] = useState(false);
	const [popupTour, setPopupTour] = useState({} as FeaturedTourData);

	const handleShowPopup = (tour: FeaturedTourData) => {
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
						<Link to='/all-tours' className='btn btn--green'>
							Discover all tours
						</Link>
					</div>
				</div>
			</section>

			<TourPopup show={showPopup} onClose={handleShowPopup} tour={popupTour} />
		</>
	);
};

export default FeaturedTours;
