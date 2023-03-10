import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetPassword } from './authSlice';
import { RootState } from '../../app/store';
import Header from '../../layouts/Header/Header';
import PulseLoader from 'react-spinners/PulseLoader';

const PasswordReset = () => {
	const { resetToken } = useParams<string>();
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const status = useAppSelector(
		(state: RootState) => state.auth.status
	);

	if (resetToken === undefined) return <div>Invalid token</div>;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(resetPassword({ resetToken, password, passwordConfirm }));
	};

	if (status === 'password-reseted') {
		navigate('/profile');
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
			<div className='login-form u_margin_top_big'>
				<h1
					className='heading-tertiary u_center_text u_margin_bottom_medium'
					style={{ fontSize: '2.5rem', transform: 'translateX(-2.5rem)' }}
				>
					Reset Password
				</h1>
				<form className='login__form' onSubmit={handleSubmit}>
					<div className='form__group'>
						<input
							type='password'
							className='form__input'
							placeholder='Password'
							id='password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<label htmlFor='password' className='form__label'>
							Password
						</label>
					</div>
					<div className='form__group'>
						<input
							type='password'
							className='form__input'
							placeholder='Confirm password'
							id='passwordConfirm'
							name='passwordConfirm'
							value={passwordConfirm}
							onChange={(e) => setPasswordConfirm(e.target.value)}
							required
						/>
						<label htmlFor='passwordConfirm' className='form__label'>
							Confirm password
						</label>
					</div>
					<div className='form__group'>
						<button className='btn btn--green'>Next step &#10132;</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default PasswordReset;
