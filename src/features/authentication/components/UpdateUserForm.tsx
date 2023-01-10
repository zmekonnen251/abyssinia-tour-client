import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';

import { SubmitButton } from '../../../components/form';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { updateMe } from './usersSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { User } from '../../../types/models';

interface IFormInputs {
	email: string;
	name: string;
}

const validationSchema = Yup.object().shape({
	name: Yup.string().min(4).required('Name is required'),
	email: Yup.string().email('Email not valid').required('Email is required'),
});

const UpdateUserForm = ({ name, email }: User) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, touchedFields },
	} = useForm<IFormInputs>({
		defaultValues: {
			name,
			email,
		},
		resolver: yupResolver(validationSchema),
	});

	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const updateMeStatus = useAppSelector((state) => state.users.status);

	const onSubmit = async (values: IFormInputs) => {
		console.log(name, email);
		await dispatch(updateMe(values));
	};

	if (updateMeStatus === 'userUpdated' && location.pathname === '/profile')
		navigate('/profile');

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='form form-user-data'>
			<div className='form__group'>
				<label className='form__label' htmlFor='name'>
					Name
				</label>
				<input
					className='form__input'
					id='name'
					type='text'
					{...register('name')}
				/>

				<ErrorMessage errors={errors} name='name' as='p' />
			</div>
			<div className='form__group'>
				<label className='form__label' htmlFor='name'>
					Email
				</label>
				<input
					className='form__input'
					id='email'
					type='email'
					{...register('email')}
				/>

				<ErrorMessage errors={errors} name='email' as='p' />
			</div>

			<SubmitButton
				title='Save Settings'
				type='submit'
				disabled={
					isSubmitting ||
					(errors.email && touchedFields.email) ||
					(errors.name && touchedFields.name)
				}
			/>
		</form>
	);
};

export default UpdateUserForm;
