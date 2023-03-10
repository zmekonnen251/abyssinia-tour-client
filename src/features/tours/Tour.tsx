import React from 'react';
import { TourModel } from '../../types/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faFlag } from '@fortawesome/free-regular-svg-icons';
// import imgSrc from '../../../assets/img/nat-8.jpg';
import { Link } from 'react-router-dom';

type TourProps = {
	tour: TourModel;
	// onShow: (tour: TourModel) => void;
};

const Tour = ({ tour }: TourProps) => {
	const {
		name,
		price,
		duration,
		summary,

		maxGroupSize,
		difficulty,
		imageCover,
		ratingsAverage,
		ratingsQuantity,
		_id,
		slug,
	} = tour;

	// const startDate = new Date(startDates[0]).toDateString().split(' ');
	return (
		<div className='card'>
			<div className='card__header'>
				<div className='card__picture'>
					<div className='card__picture-overlay'>&nbsp;</div>
					<img
						className='card__picture-img'
						src={`${process.env.REACT_APP_PUBLIC_URL}/img/tours/${imageCover}`}
						alt={`${name} tour`}
					/>
				</div>
				<h3 className='card__heading'>
					<span className='card__heading-span'>{name}</span>
				</h3>
			</div>
			<div className='card__details'>
				<h4 className='card__sub-heading'>
					{difficulty} {duration}-day tour
				</h4>
				<p className='card__text'>{summary}</p>
				<div className='card__data'>
					<FontAwesomeIcon icon={faMap} />

					<span>Banff, Canada</span>
				</div>
				<div className='card__data'>
					<FontAwesomeIcon icon={faCalendar} />

					<span>April 2021</span>
				</div>
				<div className='card__data'>
					<FontAwesomeIcon icon={faFlag} />
					<span>3 stops</span>
				</div>
				<div className='card__data'>
					<FontAwesomeIcon icon={faUsers} />

					<span>{maxGroupSize} people</span>
				</div>
			</div>
			<div className='card__footer'>
				<p>
					<span className='card__footer-value'>${price}</span>
					{'   '}
					<span className='card__footer-text'>per person</span>
				</p>
				<p className='card__ratings'>
					<span className='card__footer-value'>{ratingsAverage}</span>
					{'   '}
					<span className='card__footer-text'>rating ({ratingsQuantity})</span>
				</p>

				<Link
					to={`${_id}`}
					state={{ id: _id, slug }}
					className='btn btn--green btn--small'
				>
					Details
				</Link>
			</div>
		</div>
	);
};

export default Tour;
