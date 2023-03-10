import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';

import { FormField, SubmitButton } from '../../components/form';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { signup } from './authSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import PulseLoader from 'react-spinners/PulseLoader';

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
	const methods = useForm<IFormInputs>({
		resolver: yupResolver(validationSchema),
	});

	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const status = useAppSelector((state) => state.auth.status);

	const onSubmit = async (values: IFormInputs) => {
		await dispatch(signup(values));
	};

	if (status === 'succeed' && location.pathname === '/signup')
		navigate('/profile');

	if (status==='loading')
		return (
			<div
				style={{
					height: '70vh',
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<PulseLoader color={'#55c57a'} />
			</div>
	);

	return (
		<div className='auth'>
			<div className='auth__container'>
				<ul className='auth__links'>
					<li>
						<Link className='auth__links__link' to='/login'>
							Login
						</Link>
					</li>
					<li className='auth__links__link--active'>
						<Link className='auth__links__link' to='/signup'>
							Sign Up
						</Link>
					</li>
				</ul>
				<div className='auth__form'>
					<FormProvider {...methods}>
						<form onSubmit={methods.handleSubmit(onSubmit)} className='form'>
							<FormField
								label='Name'
								type='text'
								name='name'
								placeholder='Enter your name'
							/>
							<FormField
								label='Email'
								type='email'
								name='email'
								placeholder='Enter your email'
							/>

							<FormField
								label='Password'
								type='password'
								name='password'
								placeholder='Enter your password'
							/>
							<FormField
								label='Confirm Password'
								type='password'
								name='passwordConfirm'
								placeholder='Confirm your password'
							/>
							<SubmitButton title='Sign Up' />

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
					</FormProvider>
				</div>
			</div>
		</div>
	);
};

export default SignUpForm;
