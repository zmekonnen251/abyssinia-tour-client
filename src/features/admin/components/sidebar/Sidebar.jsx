import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import StoreIcon from '@mui/icons-material/Store';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import { logout } from '../../../authentication/authSlice';
import { faBriefcase, faMap, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { DarkModeContext } from '../../context/darkModeContext';
// import { useContext } from 'react';

const Sidebar = () => {
	// const { dispatch } = useContext(DarkModeContext);
	const dispatch = useAppDispatch();
	const location = useLocation();
	const path = location.pathname.split('/')[2];
	return (
		<div className='sidebar'>
			{/* <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">lamadmin</span>
        </Link>
      </div>
      <hr /> */}
			<div className='center'>
				<ul>
					<p className='title'>MAIN</p>
					<li>
						<Link to='/dashboard' style={{ textDecoration: 'none' }}>
							<DashboardIcon className='icon' />
							<span>Dashboard</span>
						</Link>
					</li>
					<p className='title'>LISTS</p>
					<Link to='/dashboard/users' style={{ textDecoration: 'none' }}>
						<li>
							<FontAwesomeIcon icon={faUsers} />
							<span>Users</span>
						</li>
					</Link>
					<Link to='/dashboard/tours' style={{ textDecoration: 'none' }}>
						<li>
							<FontAwesomeIcon icon={faMap} />
							<span>Tours</span>
						</li>
					</Link>
					<li>
						<Link to='/dashboard/bookings' style={{ textDecoration: 'none' }}>
							<FontAwesomeIcon icon={faBriefcase} />
							<span>Bookings</span>
						</Link>
					</li>
					<li>
						<LocalShippingIcon className='icon' />
						<span>Delivery</span>
					</li>
					<p className='title'>USEFUL</p>
					<li>
						<InsertChartIcon className='icon' />
						<span>Stats</span>
					</li>
					<li>
						<NotificationsNoneIcon className='icon' />
						<span>Notifications</span>
					</li>
					<p className='title'>SERVICE</p>
					<li>
						<SettingsSystemDaydreamOutlinedIcon className='icon' />
						<span>System Health</span>
					</li>
					<li>
						<PsychologyOutlinedIcon className='icon' />
						<span>Logs</span>
					</li>
					<li>
						<SettingsApplicationsIcon className='icon' />
						<span>Settings</span>
					</li>
					<p className='title'>USER</p>
					<li>
						<Link to='/profile' style={{ textDecoration: 'none' }}>
							<AccountCircleOutlinedIcon className='icon' />
							<span>Profile</span>
						</Link>
					</li>
					<li>
						<button
							onClick={() => dispatch(logout())}
							style={{
								border: 'none',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								background: 'none',
								gap: '.8rem',
								color: 'inherit',
							}}
						>
							<ExitToAppIcon className='icon' />
							Logout
						</button>
					</li>
				</ul>
			</div>
			<div className='bottom'>
				<div
					className='colorOption'
					// onClick={() => atch({ type: 'LIGHTdisp' })}
				></div>
				<div
					className='colorOption'
					// onClick={() => dispatch({ type: 'DARK' })}
				></div>
			</div>
		</div>
	);
};

export default Sidebar;
