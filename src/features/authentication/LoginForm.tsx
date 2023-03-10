import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FormField, SubmitButton } from '../../components/form';
import { useAppDispatch,useAppSelector } from '../../app/hooks';
import { login } from './authSlice';
import { Link, useNavigate } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';

interface IFormInputs {
	email: string;
	password: string;
}

const validationSchema = Yup.object().shape({
	email: Yup.string().email('Email not valid').required('Email is required'),
	password: Yup.string()
		.min(8, 'The length of your password must be 8 chracters long.')
		.required('Password is required'),
});

const LoginForm = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const methods = useForm<IFormInputs>({
		resolver: yupResolver(validationSchema),
	});

	const status = useAppSelector((state) => state.auth.status)

	// const dispatch = useAppDispatch();
	// const navigate = useNavigate();

	const onSubmit = async (values: IFormInputs) => {
		dispatch(login({ ...values, navigate }));

		// dispatch(setCredentials({ accessToken }));
	};

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
					<li className='auth__links__link--active'>
						<Link className='auth__links__link' to='/login'>
							Login
						</Link>
					</li>
					<li>
						<Link className='auth__links__link' to='/signup'>
							Sign Up
						</Link>
					</li>
				</ul>
				<div className='auth__form'>
					<FormProvider {...methods}>
						<form onSubmit={methods.handleSubmit(onSubmit)} className='form'>
							<FormField
								name='email'
								label='Email'
								type='email'
								placeholder='Email'
							/>
							<FormField
								name='password'
								label='Password'
								type='password'
								placeHolder='Password'
							/>
							<SubmitButton title='Sign In' />

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

export default LoginForm;
