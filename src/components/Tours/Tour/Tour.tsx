// import React, { useEffect } from 'react';

import './Tour.scss';
// import card1Src from '../../../assets/img/nat-5.jpg';
import { TourData } from '../../../types';

type TourProps = {
	tour: TourData;
};

const Tour = ({ tour }: TourProps) => {
	const {
		name,
		price,
		duration,
		summary,
		guides,
		maxGroupSize,
		difficulty,
		imgCover,
		color,
	} = tour;

	const pictureStyle = {
		backgroundSize: 'cover',
		height: '23rem',
		backgroundBlendMode: 'screen',

		WebKitClipPath: `polygon(0 0, 100% 0, 100% 85%, 0 100%)`,
		clipPath: `polygon(0 0, 100% 0, 100% 85%, 0 100%)`,

		backgroundImage: `linear-gradient(
				to right bottom,
				${color.light},
				${color.dark}),
			url(${imgCover})`,
	};

	const backFaceColorGradient = {
		backgroundImage: `linear-gradient(
					to right bottom,
					${color.light},
					${color.dark}
				)`,
	};

	return (
		<div className='col-1-of-3'>
			<div className='card'>
				<div className='card__side card__side--front card__side--front-1'>
					<div className='card__picture' style={pictureStyle}>
						&nbsp;
					</div>
					<h4 className='card__heading'>
						<span className='card__heading-span card__heading-span--1'>
							{name}
						</span>
					</h4>
					<div className='card__details'>
						<ul>
							<li>{duration} day tours</li>
							<li>Up to {maxGroupSize} people</li>
							<li>{guides.length} tour guides</li>
							<li>{summary}</li>
							<li>Difficulty: {difficulty}</li>
						</ul>
					</div>
				</div>

				<div
					className='card__side card__side--back'
					style={backFaceColorGradient}
				>
					<div className='card__cta'>
						<div className='card__price-box'>
							<p className='card__price-only'>Only</p>
							<p className='card__price-value'>${price}</p>
						</div>
						<a href='#1' className='btn btn--white'>
							Book now!
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Tour;
