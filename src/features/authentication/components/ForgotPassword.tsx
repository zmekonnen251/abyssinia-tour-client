import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { forgotPassword } from './authSlice';
import { RootState } from '../../../store/store';
import Header from '../../../layouts/Header/Header';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const forgotPasswordStatus = useAppSelector(
		(state: RootState) => state.auth.status
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(forgotPassword(email));
	};

	if (
		forgotPasswordStatus === 'succeed' &&
		location.pathname === '/forgot-password'
	) {
		navigate('/');
	}

	return (
		<>
			<Header />
			<div className='login-form u_margin_top_big'>
				<h1
					className='heading-tertiary u_center_text u_margin_bottom_medium'
					style={{ fontSize: '2.5rem', transform: 'translateX(-2.5rem)' }}
				>
					Forgot Password
				</h1>
				<form className='login__form' onSubmit={handleSubmit}>
					<div className='form__group'>
						<input
							type='email'
							className='form__input'
							placeholder='Email'
							id='email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<label htmlFor='email' className='form__label'>
							Email
						</label>
					</div>

					<div className='form__group'>
						<button className='btn btn--green'>Submit</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default ForgotPassword;
