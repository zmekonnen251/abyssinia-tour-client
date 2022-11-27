import React from 'react';
import './TourPopup.scss';
import img1Src from '../../assets/img/nat-8.jpg';
import img2Src from '../../assets/img/nat-9.jpg';

type TourPopupProps = {
	show: boolean;
	onClose: () => void;
};
const TourPopup = ({ show, onClose }: TourPopupProps) => {
	console.log(show);
	return (
		<>
			{show && (
				<div className='popup'>
					<div className='popup__content'>
						<div className='popup__left'>
							<img src={img1Src} alt='Tour 1' className='popup__img' />
							<img src={img2Src} alt='Tour 2' className='popup__img' />
						</div>
						<div className='popup__right'>
							<button type='button' onClick={onClose} className='popup__close'>
								&times;
							</button>
							<h2 className='heading-secondary u_margin_bottom_small'>
								Start booking now
							</h2>
							<h3 className='heading-tertiary u_margin_bottom_small'>
								Important &ndash; Please read these terms before booking
							</h3>

							<p className='popup__text'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Quisquam voluptates, quod, quia, voluptate quae voluptatem
								quibusdam Lorem ipsum dolor sit amet consectetur adipisicing
								elit. Quisquam voluptates, quod, quia, voluptate quae voluptatem
								quibusdam Lorem ipsum dolor sit amet consectetur adipisicing
								elit. Quisquam voluptates, quod, quia, voluptate quae voluptatem
								quibusdam Lorem ipsum dolor sit amet consectetur adipisicing
								elit. Quisquam voluptates, quod, quia, voluptate quae voluptatem
								quibusdam Lorem ipsum dolor sit amet consectetur adipisicing
								elit. Quisquam voluptates, quod, quia, voluptate quae voluptatem
								quibusdam
							</p>
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
