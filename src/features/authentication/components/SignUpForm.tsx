import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';

import { SubmitButton } from '../../../components/form';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { signup } from './authSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface IFormInputs {
	email: string;
	password: string;
	name: string;
	passwordConfirm: string;
}

const validationSchema = Yup.object().shape({
	name: Yup.string().min(4).required('Name is required'),
	email: Yup.string().email('Email not valid').required('Email is required'),
	password: Yup.string()
		.min(8, 'The length of your password must be 8 chracters long.')
		.required('Password is required'),
	passwordConfirm: Yup.string().oneOf(
		[Yup.ref('password'), null],
		'Passwords must match'
	),
});

const SignUpForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, touchedFields },
	} = useForm<IFormInputs>({
		resolver: yupResolver(validationSchema),
	});

	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const signUpStatus = useAppSelector((state) => state.auth.status);

	const onSubmit = async (values: IFormInputs) => {
		await dispatch(signup(values));
	};

	if (signUpStatus === 'succeed' && location.pathname === '/signup')
		navigate('/profile');

	return (
		<div className='login'>
			<h1 className='heading-tertiary u_center_text u_margin_bottom_small'>
				Sign Up
			</h1>
			<form onSubmit={handleSubmit(onSubmit)} className='login__form'>
				<div className='form__group'>
					<label htmlFor='name' className='form__label'>
						Name
					</label>
					<input
						id='name'
						type='text'
						className='form__input'
						{...register('name')}
					/>
					<ErrorMessage errors={errors} name='name' as='p' />
				</div>
				<div className='form__group'>
					<label htmlFor='email' className='form__label'>
						Email
					</label>
					<input
						id='email'
						type='email'
						className='form__input'
						{...register('email')}
					/>
					<ErrorMessage errors={errors} name='email' as='p' />
				</div>
				<div className='form__group'>
					<label htmlFor='password' className='form__label'>
						Password
					</label>
					<input
						id='password'
						type='password'
						className='form__input'
						{...register('password')}
					/>
					<ErrorMessage errors={errors} name='password' as='p' />
				</div>

				<div className='form__group'>
					<label htmlFor='passwordConfirm' className='form__label'>
						Confirm Password
					</label>
					<input
						id='passwordConfirm'
						type='password'
						className='form__input'
						{...register('passwordConfirm')}
					/>
					<ErrorMessage errors={errors} name='passwordConfirm' as='p' />
				</div>

				<SubmitButton
					title='Sign Up'
					type='submit'
					disabled={
						isSubmitting ||
						(errors.email && touchedFields.email) ||
						(errors.password && touchedFields.password) ||
						(errors.passwordConfirm && touchedFields.passwordConfirm) ||
						(errors.name && touchedFields.name)
					}
				/>

				<div className='login__divider' />
				<div className='action-links'>
					<Link to='/signup' className='btn-text'>
						Don't have an account? Sign up
					</Link>
					<Link to='/forgot-password' className='btn-text'>
						Forgot password?
					</Link>
				</div>
			</form>
		</div>
	);
};

export default SignUpForm;
