import React from 'react';
import userImgSrc from '../../../assets/img/leo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBriefcase,
	faCreditCard,
	faMap,
	faStar,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Header from '../../../layouts/Header/Header';
import { useAppSelector } from '../../../store/hooks';
import { currentUser } from './authSlice';
import UpdateUserForm from './UpdateUserForm';
import { User } from '../../../types/models';

const Profile = () => {
	const user = useAppSelector(currentUser)?.user;
	const userName = user?.name;
	const userEmail = user?.email;
	return (
		<>
			<Header />

			<div className='user-view'>
				<nav className='user-view__menu'>
					<ul className='side-nav'>
						<li className='side-nav--active'>
							<a href='#asdas'>
								<FontAwesomeIcon icon={faGear} />
								Settings
							</a>
						</li>
						<li>
							<a href='#sadf'>
								<FontAwesomeIcon icon={faBriefcase} />
								My bookings
							</a>
						</li>
						<li>
							<a href='#dasdf'>
								<FontAwesomeIcon icon={faStar} />
								My reviews
							</a>
						</li>
						<li>
							<a href='#safdasdf'>
								<FontAwesomeIcon icon={faCreditCard} />
								Billing
							</a>
						</li>
					</ul>
					{user?.role === 'admin' && (
						<div className='admin-nav'>
							<h5 className='admin-nav__heading'>Admin</h5>
							<ul className='side-nav'>
								<li>
									<a href='#asfasf'>
										<FontAwesomeIcon icon={faMap} />
										Manage tours
									</a>
								</li>
								<li>
									<a href='#asdfas'>
										<FontAwesomeIcon icon={faUsers} />
										Manage users
									</a>
								</li>
								<li>
									<a href='#sdafdsa'>
										<FontAwesomeIcon icon={faStar} />
										Manage reviews
									</a>
								</li>
								<li>
									<a href='#asas'>
										<FontAwesomeIcon icon={faBriefcase} />
										Manage bookings
									</a>
								</li>
							</ul>
						</div>
					)}
				</nav>
				<div className='user-view__content'>
					<div className='user-view__form-container'>
						<h2 className='heading-secondary ma-bt-md'>
							Your account settings
						</h2>
						{/* <form className='form form-user-data'>
							<div className='form__group'>
								<label className='form__label' htmlFor='name'>
									Name
								</label>
								<input
									className='form__input'
									id='name'
									type='text'
									value={user?.user?.name}
									required
								/>
							</div>
							<div className='form__group ma-bt-md'>
								<label className='form__label' htmlFor='email'>
									Email address
								</label>
								<input
									className='form__input'
									id='email'
									type='email'
									value={user?.user?.email}
									required
								/>
							</div>
							<div className='form__group form__photo-upload'>
								<img className='form__user-photo' src={userImgSrc} alt='User' />
								<a className='btn-text' href='#asdf'>
									Choose new photo
								</a>
							</div>
							<div className='form__group right'>
								<button className='btn btn--small btn--green'>
									Save settings
								</button>
							</div>
						</form> */}
						<UpdateUserForm
							name={userName as string}
							email={userEmail as string}
						/>
					</div>
					<div className='line'>&nbsp;</div>
					<div className='user-view__form-container'>
						<h2 className='heading-secondary ma-bt-md'>Password change</h2>
						<form className='form form-user-settings'>
							<div className='form__group'>
								<label className='form__label' htmlFor='password-current'>
									Current password
								</label>
								<input
									className='form__input'
									id='password-current'
									type='password'
									placeholder='••••••••'
									required
									min='8'
								/>
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
									required
									min='8'
								/>
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
									required
									min='8'
								/>
							</div>
							<div className='form__group right'>
								<button className='btn btn--small btn--green'>
									Save password
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
