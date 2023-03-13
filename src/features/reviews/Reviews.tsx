import React from 'react';
import ReviewForm from './ReviewForm';
import ReviewCard from './ReviewCard';
import CardSlider from '../../components/CardSlider';
import { ReviewModel } from '../../types/models';
import useAuth from '../../hooks/useAuth';

type ReviewsProps = {
	tourId: string;
	reviews: ReviewModel[];
};

const Reviews = ({ tourId, reviews }: ReviewsProps) => {
		const {isLoggedIn} = useAuth()


	return (
		<>
			{' '}
			<section className='section-reviews'>
				<CardSlider>
					{reviews?.map((review) => (
						<ReviewCard key={review._id} review={review} />
					))}
				</CardSlider>
			</section>
			<section className='section-review-form'>
				{isLoggedIn && <ReviewForm tourId={tourId} />}
			</section>
		</>
	);
};

export default Reviews;
