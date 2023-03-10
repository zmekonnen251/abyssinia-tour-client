import { faClock, faMap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { type TourModel } from '../../types/models';

type TourDetailsHeaderProps = {
	tour: TourModel;
};

const TourDetailsHeader = ({ tour }: TourDetailsHeaderProps) => {
	return (
		<section className='section-header'>
			<div className='header__hero'>
				<div className='header__hero-overlay'>&nbsp;</div>
				<img
					className='header__hero-img'
					src={`${process.env.REACT_APP_PUBLIC_URL}/img/tours/${tour?.imageCover}`}
					alt={tour?.name}
				/>
			</div>
			<div className='heading-box'>
				<h1 className='heading-primary-tour-details'>
					<span>{tour?.name}</span>
				</h1>
				<div className='heading-box__group'>
					<div className='heading-box__detail'>
						<FontAwesomeIcon icon={faClock} className='heading-box__icon' />

						<span className='heading-box__text'>{tour?.duration} days</span>
					</div>
					<div className='heading-box__detail'>
						<FontAwesomeIcon icon={faMap} className='heading-box__icon' />

						<span className='heading-box__text'>
							{tour?.startLocation?.description}
						</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TourDetailsHeader;
