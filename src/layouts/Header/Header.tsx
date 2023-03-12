import { Link, NavLink, useNavigate } from 'react-router-dom';
import logoSrc from '../../assets/img/logo-white.png';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/authentication/authSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import useAuth from '../../hooks/useAuth';

const Header = () => {
	const user = useAuth();
	const status = useAppSelector((state) => state.auth.status);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout({ navigate }));
	};

	return (
		<header className='header-wrapper'>
			<div className='header'>
				<div className='header-left'>
					<div className='logo'>
						<Link to='/'>
							<img src={logoSrc} className='logo-img' alt='Natours logo' />
						</Link>
					</div>
				</div>

				<nav className='nav'>
					<ul className='nav--user'>
						<li>
							<Link to='/tours' className='nav-el'>
								All Tours
							</Link>
						</li>
						{user?.isLoggedIn && (
							<>
								<li>
									<button onClick={handleLogout} className='nav-el'>
										{status === 'loading' ? (
											<PulseLoader color={'#55c57a'} />
										) : (
											'Log Out'
										)}
									</button>
								</li>
								<li>
									<Link
										to={user?.isAdmin ? '/admin' : '/profile'}
										className='nav-el'
									>
										<img
											src={`${process.env.REACT_APP_PUBLIC_URL}/img/users/${user?.photo}`}
											className='nav__user-img'
											alt={user?.name}
										/>
									</Link>
								</li>
								<li>
									<NavLink to={'/profile'} className='nav-el'>
										{user?.name?.split(' ')[0]}
									</NavLink>
								</li>
								{user?.isAdmin && (
									<li>
										<NavLink to='/dashboard' className='nav-el'>
											Dashboard
										</NavLink>
									</li>
								)}
							</>
						)}
						{!user?.isLoggedIn && (
							<>
								<li>
									<NavLink to='/login' className='nav-el'>
										Log IN
									</NavLink>
								</li>
								<li>
									<NavLink to='/signup' className='nav-el signup'>
										Sign Up
									</NavLink>
								</li>
							</>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
