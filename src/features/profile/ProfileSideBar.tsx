import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBriefcase,
	faCreditCard,
	faGear,
	faMap,
	faStar,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';

import useAuth from '../../hooks/useAuth';

function ProfileSideBar() {
	const user = useAuth()

	return (
		<nav className='user-view__menu'>
			<ul className='side-nav'>
				<li>
					<Link to='/profile' className={`side-nav--active`}>
						<FontAwesomeIcon icon={faGear} />
						Settings
					</Link>
				</li>
				<li>
					<Link to='/profile/my-bookings'>
						<FontAwesomeIcon icon={faBriefcase} />
						My bookings
					</Link>
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
			{user?.isAdmin && (
				<div className='admin-nav'>
					<h5 className='admin-nav__heading'>Admin</h5>
					<ul className='side-nav'>
						<li>
							<Link to='/profile/manage-tours'>
								<FontAwesomeIcon icon={faMap} />
								Manage tours
							</Link>
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
	);
}

export default ProfileSideBar;
