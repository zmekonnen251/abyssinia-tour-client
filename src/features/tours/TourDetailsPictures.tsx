import React from 'react';

const TourDetailsPictures = ({ images }: { images: string[] }) => {
	return (
		<section className='section-pictures'>
			<div className='picture-box'>
				<img
					className='picture-box__img picture-box__img--1'
					src={`${process.env.REACT_APP_PUBLIC_URL}/img/tours/${images[0]}`}
					alt='The Park Camper Tour 1'
				/>
			</div>
			<div className='picture-box'>
				<img
					className='picture-box__img picture-box__img--2'
					src={`${process.env.REACT_APP_PUBLIC_URL}/img/tours/${images[1]}`}
					alt='The Park Camper Tour 1'
				/>
			</div>
			<div className='picture-box'>
				<img
					className='picture-box__img picture-box__img--3'
					src={`${process.env.REACT_APP_PUBLIC_URL}/img/tours/${images[2]}`}
					alt='The Park Camper Tour 1'
				/>
			</div>
		</section>
	);
};

export default TourDetailsPictures;
