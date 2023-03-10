import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';

import { SubmitButton } from '../../components/form';
import { useAppDispatch } from '../../app/hooks';
import { updatePassword } from '../authentication/authSlice';

interface IFormInputs {
	passwordCurrent: string;
	password: string;
	passwordConfirm: string;
}

const validationSchema = Yup.object().shape({
	passwordCurrent: Yup.string().min(8).required('Name is required'),
	password: Yup.string()
		.min(8, 'The length of your password must be 8 chracters long.')
		.required('Password is required'),
	passwordConfirm: Yup.string().oneOf(
		[Yup.ref('password'), null],
		'Passwords must match'
	),
});

const UpdatePasswordForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, touchedFields },
	} = useForm<IFormInputs>({
		resolver: yupResolver(validationSchema),
	});

	const dispatch = useAppDispatch();

	const onSubmit = async (values: IFormInputs) => {
		await dispatch(updatePassword(values));
	};

	return (
		<div className='user-view__form-container'>
			<h2 className='heading-secondary ma-bt-md'>Password change</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='form form-user-settings'
			>
				<div className='form__group'>
					<label className='form__label' htmlFor='password-current'>
						Current password
					</label>
					<input
						className='form__input'
						id='password-current'
						type='password'
						placeholder='••••••••'
						{...register('passwordCurrent')}
					/>
					<ErrorMessage errors={errors} name='passwordCurrent' as='p' />
				</div>
				<div className='form__group'>
					<label className='form__label' htmlFor='password'>
						New password
					</label>
					<input
						className='form__input'
						id='password'
						type='password'
						placeholder='••••••••'
						{...register('password')}
					/>
					<ErrorMessage errors={errors} name='password' as='p' />
				</div>
				<div className='form__group ma-bt-lg'>
					<label className='form__label' htmlFor='password-confirm'>
						Confirm password
					</label>
					<input
						className='form__input'
						id='password-confirm'
						type='password'
						placeholder='••••••••'
						{...register('passwordConfirm')}
					/>
					<ErrorMessage errors={errors} name='passwordConfirm' as='p' />
				</div>
				<div className='form__group right'>
					<SubmitButton
						title='Save password'
						type='submit'
						disabled={
							isSubmitting ||
							(errors.passwordCurrent && touchedFields.passwordCurrent) ||
							(errors.password && touchedFields.password) ||
							(errors.passwordConfirm && touchedFields.passwordConfirm)
						}
					/>
				</div>
			</form>
		</div>
	);
};

export default UpdatePasswordForm;
