import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import logoSrc from '../../assets/img/logo-white.png';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
	currentUser,
	logout,
	getUser,
} from '../../features/authentication/components/authSlice';
import { useEffect } from 'react';

const Header = () => {
	const user = useAppSelector(currentUser);
	const status = useAppSelector((state) => state.auth.status);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!user) dispatch(getUser());
	}, [location, user, dispatch]);

	const handleLogout = () => {
		dispatch(logout());
		
	};

	if (status === 'loggedOut') {
		navigate('/login');
	}

	return (
		<header className='header-wrapper'>
			<div className='header'>
				<Link to='/tours' className='nav-el'>
					All Tours
				</Link>
				<div className='logo'>
					<Link to='/'>
						<img src={logoSrc} className='logo-img' alt='Natours logo' />
					</Link>
				</div>
				<nav className='nav'>
					<ul className='nav--user'>
						{user && (
							<>
								<button onClick={handleLogout} className='nav-el'>
									Log Out
								</button>
								<NavLink to='/profile' className='nav-el'>
									{user.user?.name}
								</NavLink>
								<Link to='/profile' className='nav-el'>
									<img
										src={`http://localhost:5000/img/users/user-1.jpg`}
										className='nav__user-img'
										alt={user.user?.name}
									/>
								</Link>
							</>
						)}
						{!user && (
							<>
								<NavLink to='/login' className='nav-el'>
									Log IN
								</NavLink>
								<NavLink to='/signup' className='nav-el'>
									Sign Up
								</NavLink>
							</>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
