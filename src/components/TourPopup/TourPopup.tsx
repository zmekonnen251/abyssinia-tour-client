import React from 'react';
import { TourData } from '../../types';

type TourPopupProps = {
	show: boolean;
	tour: TourData;
	onClose: (tour: TourData) => void;
};
const TourPopup = ({ show, onClose, tour }: TourPopupProps) => {
	const { description, imgs } = tour;
	return (
		<>
			{show && (
				<div className='popup'>
					<div className='popup__content'>
						<button
							type='button'
							onClick={() => onClose(tour)}
							className='popup__close'
						>
							&times;
						</button>
						<div className='popup__left'>
							<img src={imgs[0]} alt='Tour 1' className='popup__img' />
							<img src={imgs[1]} alt='Tour 2' className='popup__img' />
						</div>
						<div className='popup__right'>
							<h2 className='heading-secondary u_margin_bottom_small'>
								Start booking now
							</h2>
							<h3 className='heading-tertiary u_margin_bottom_small'>
								Important &ndash; Please read these terms before booking
							</h3>

							<p className='popup__text'>{description}</p>
							<a href='#ab' className='btn btn--green'>
								Book now
							</a>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default TourPopup;
