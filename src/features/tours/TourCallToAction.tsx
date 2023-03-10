import React from 'react';
import { TourModel } from '../../types/models';

type TourCallToActionProps = {
	tour: TourModel;
	onClick: () => void;
	checkoutLoading: boolean;
};

const TourCallToAction = ({
	tour,
	onClick,
	checkoutLoading,
}: TourCallToActionProps) => {
	return (
		<section className='section-cta'>
			<div className='cta'>
				<div className='cta__img cta__img--logo'>
					<img
						src={`${process.env.REACT_APP_PUBLIC_URL}/img/logo-white.png`}
						alt='Natours logo'
					/>
				</div>
				<img
					className='cta__img cta__img--1'
					src={`${process.env.REACT_APP_PUBLIC_URL}/img/tours/${
						tour?.images && tour?.images[0]
					}`}
					alt=''
				/>
				<img
					className='cta__img cta__img--2'
					src={`${process.env.REACT_APP_PUBLIC_URL}/img/tours/${
						tour?.images && tour?.images[1]
					}`}
					alt=''
				/>
				<div className='cta__content'>
					<h2 className='heading-secondary-tour-details'>
						What are you waiting for?
					</h2>
					<p className='cta__text'>
						{tour?.duration} days. {tour?.summary}
					</p>
					<button
						className={`btn ${
							checkoutLoading ? 'btn--red' : 'btn--green'
						} span-all-rows`}
						onClick={onClick}
						disabled={checkoutLoading}
					>
						{checkoutLoading && <span>Processing..</span>}
						{!checkoutLoading && <span>Book tour now!</span>}
					</button>
				</div>
			</div>
		</section>
	);
};

export default TourCallToAction;
