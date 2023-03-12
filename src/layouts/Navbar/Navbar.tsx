import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/authentication/authSlice';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleNavShow = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className='navigation'>
			<input
				type='checkbox'
				className='navigation__checkbox'
				id='navi-toggle'
				checked={isMenuOpen}
			/>
			<label
				htmlFor='navi-toggle'
				className='navigation__button'
				onClick={handleNavShow}
			>
				<span className='navigation__icon'>&nbsp;</span>
			</label>
			<>
				<div className='navigation__background'>&nbsp;</div>
				<nav className='navigation__nav'>
					<div className='navigation__list'>
						<a
							id='navlink1'
							href='#about'
							className='navigation__link'
							onClick={handleNavShow}
						>
							01 &nbsp;About Natours
						</a>

						<a
							href='#tours'
							className='navigation__link'
							onClick={handleNavShow}
						>
							02 &nbsp;Your benefits
						</a>

						<a
							href='#tours'
							className='navigation__link'
							onClick={handleNavShow}
						>
							03 &nbsp;Popular tours
						</a>

						<a
							href='#stories'
							className='navigation__link'
							onClick={handleNavShow}
						>
							04 &nbsp;Stories
						</a>

						<a
							href='#book'
							className='navigation__link'
							onClick={handleNavShow}
						>
							05 &nbsp;Book now
						</a>
						{user?.isLoggedIn && (
							<>
								<Link to='/profile' className='navigation__link'>
									Profile
								</Link>
								<Link
									to='/login'
									onClick={() => {
										dispatch(logout({ navigate }));
									}}
									className='navigation__link'
								>
									Log Out
								</Link>
							</>
						)}
						{!user?.isLoggedIn && (
							<>
								<Link to='/login' className='navigation__link'>
									Log In
								</Link>

								<Link to='/signup' className='navigation__link'>
									Sign Up
								</Link>
							</>
						)}
					</div>
				</nav>
			</>
		</div>
	);
};

export default Navbar;
