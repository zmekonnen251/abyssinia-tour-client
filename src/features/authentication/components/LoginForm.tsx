import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { SubmitButton } from '../../../components/form';
import { ErrorMessage } from '@hookform/error-message';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { login } from './authSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface IFormInputs {
	email: string;
	password: string;
}

const validationSchema = Yup.object().shape({
	email: Yup.string().email('Email not valid').required('Email is required'),
	password: Yup.string().min(8, 'The length of your password must be 8 chracters long.').required('Password is required'),
});

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, touchedFields },
	} = useForm<IFormInputs>({
		resolver: yupResolver(validationSchema),
	});

	const loginStatus = useAppSelector((state) => state.auth.status);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const onSubmit = async (values: IFormInputs) => {
		console.log(errors);
		await dispatch(login(values));
	};

	if (loginStatus === 'succeed' && location.pathname === '/login')
		navigate('/profile');

	return (
		<div className='login'>
			<h1
				className='heading-tertiary u_center_text u_margin_bottom_small'
				style={{ fontSize: '2.5rem', transform: 'translateX(-2.5rem)' }}
			>
				Log In
			</h1>
			<form onSubmit={handleSubmit(onSubmit)} className='login__form'>
				<div className='form__group'>
					<label htmlFor='email' className='form__label'>
						Email
					</label>
					<input id='email' className='form__input' {...register('email')} />

					<ErrorMessage errors={errors} name='email' as='p' />
				</div>
				<div className='form__group'>
					<label htmlFor='password' className='form__label'>
						Password
					</label>
					<input
						type='password'
						className='form__input'
						{...register('password')}
					/>
					<ErrorMessage errors={errors} name='password' as='p' />
				</div>

				<SubmitButton
					title='Sign In'
					type='submit'
					disabled={
						isSubmitting ||
						!!(errors.email && touchedFields.email) ||
						!!(errors.password && touchedFields.password)
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

export default LoginForm;
