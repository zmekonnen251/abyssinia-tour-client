import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';
import { Rating } from '@mui/material';

import { SubmitButton } from '../../components/form';
import { useAppDispatch } from '../../app/hooks';
import { createReview } from './reviewsSlice';
import { useState } from 'react';

interface IFormInputs {
	review: string;
}

const validationSchema = Yup.object().shape({
	review: Yup.string()
		.min(6, 'The length of your review must be 6 chracters long.')
		.required('Review is required'),
});

const ReviewForm = ({ tourId }) => {
	const {
		register,
		handleSubmit,

		formState: { errors, isSubmitting },
	} = useForm<IFormInputs>({
		resolver: yupResolver(validationSchema),
	});

	const [rating, setRating] = useState<number>(1);
	const dispatch = useAppDispatch();

	const onSubmit = async (values: IFormInputs) => {
		console.log(values);
		const review = {
			...values,
			rating,
			tourId,
		};

		await dispatch(createReview(review));
	};

	return (
		<div className='book__form'>
			<form className='form' onSubmit={handleSubmit(onSubmit)}>
				<div className='u_margin_bottom_small'>
					<h2 className='heading-teritiary '>Add a Review</h2>
				</div>
				<div className='form__group'>
					<textarea
						rows={4}
						cols={50}
						className='form__text-area'
						placeholder='Add your review here'
						{...register('review')}
						required
					></textarea>

					<label htmlFor='name' className='form__label'>
						Review
					</label>
					<ErrorMessage errors={errors} name='review' as='p' />
				</div>
				<div className='form__group'>
					<Rating
						defaultValue={1}
						onChange={(e, newValue) => {
							setRating(newValue as number);
						}}
						precision={0.5}
						max={5}
						value={rating}
						sx={{ fontSize: '3rem' }}
					/>
				</div>

				<SubmitButton disable={isSubmitting} title='Add Review' type='submit' />
			</form>
		</div>
	);
};

export default ReviewForm;
