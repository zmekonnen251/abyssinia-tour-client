import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { forgotPassword } from './authSlice';
import { RootState } from '../../app/store';
import Header from '../../layouts/Header/Header';
import { FormProvider } from 'react-hook-form';
import { FormField, SubmitButton } from '../../components/form';
import PulseLoader from 'react-spinners/PulseLoader';

interface IFormInputs {
	email: string;
}

const validationSchema = Yup.object().shape({
	email: Yup.string().email('Email not valid').required('Email is required'),
});


const ForgotPassword = () => {
	const methods = useForm<IFormInputs>({
		resolver: yupResolver(validationSchema),
	});

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const status = useAppSelector(
		(state: RootState) => state.auth.status
	);

	const onSubmit = (values: IFormInputs) => {
		dispatch(forgotPassword(values?.email));
	};

	if (
		status === 'succeed' &&
		location.pathname === '/forgot-password'
	) {
		navigate('/');
	}

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
		<>
			<Header />
			<div className='auth'>
				<div className='auth__container'>
					<ul className='auth__links'>
						<li className='auth__links__link--active'>
							<Link className='auth__links__link' to='/login'>
								Forgot Password
							</Link>
						</li>
					</ul>
					<div className='auth__form'>
						<FormProvider {...methods}>
							<form className='form' onSubmit={methods.handleSubmit(onSubmit)}>
								<FormField
									name='email'
									type='email'
									label='Email'
									placeholder='Enter Your Email'
								/>

								<SubmitButton title='Submit' />
							</form>
						</FormProvider>
					</div>
				</div>
			</div>
		</>
	);
};

export default ForgotPassword;
