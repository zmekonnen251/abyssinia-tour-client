import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReviewModel } from '../../types/models';

type ReviewCardProps = {
	review: ReviewModel;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
	const { review: reviewText, rating, user } = review;

	const ratingStars = Array.from(
		rating ? { length: rating } : { length: 0 },
		(_, i) => i + 1
	);

	return (
		<div className='reviews__card'>
			<div className='reviews__avatar'>
				<img
					className='reviews__avatar-img'
					src={`${process.env.REACT_APP_PUBLIC_URL}/img/users/${user?.photo}`}
					alt='Jim Brown'
				/>
				<h6 className='reviews__user'>{user?.name}</h6>
			</div>
			<p className='reviews__text'>{reviewText}</p>
			<div className='reviews__rating'>
				{ratingStars?.map((_, i) => (
					<FontAwesomeIcon
						key={i}
						icon={faStar}
						className='reviews__star reviews__star--active'
					/>
				))}
				{ratingStars?.length < 5 &&
					Array.from({ length: 5 - ratingStars?.length }, (_, i) => i + 1).map(
						(_, i) => (
							<FontAwesomeIcon
								key={i}
								icon={faStarRegular}
								className='reviews__star'
							/>
						)
					)}
			</div>
		</div>
	);
};

export default ReviewCard;
