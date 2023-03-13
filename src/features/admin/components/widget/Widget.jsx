import './widget.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBriefcase,
	faMap,
	faMoneyBill,
	faMoneyBill1Wave,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Widget = ({ type, amount }) => {
	let data;

	//temporary

	const diff = 20;

	switch (type) {
		case 'users':
			data = {
				title: 'USERS',
				isMoney: false,
				link: 'See all users',
				icon: (
					<FontAwesomeIcon
						icon={faUsers}
						className='icon'
						style={{
							color: 'crimson',
							backgroundColor: 'rgba(255, 0, 0, 0.2)',
						}}
					/>
				),
			};

			break;
		case 'bookings':
			data = {
				title: 'BOOKINGS',
				isMoney: false,
				link: 'View all Bookings',
				icon: (
					<FontAwesomeIcon
						icon={faBriefcase}
						className='icon'
						style={{
							backgroundColor: 'rgba(218, 165, 32, 0.2)',
							color: 'goldenrod',
						}}
					/>
				),
			};

			break;
		case 'tours':
			data = {
				title: 'TOURS',
				isMoney: false,
				link: 'View all Tours',
				icon: (
					<FontAwesomeIcon
						icon={faMap}
						className='icon'
						style={{
							backgroundColor: 'rgba(218, 165, 32, 0.2)',
							color: 'goldenrod',
						}}
					/>
				),
			};

			break;
		case 'earning':
			data = {
				title: 'EARNINGS',
				isMoney: true,
				link: 'View net earnings',
				icon: (
					<FontAwesomeIcon
						icon={faMoneyBill}
						className='icon'
						style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
					/>
				),
			};

			break;
		case 'balance':
			data = {
				title: 'BALANCE',
				isMoney: true,
				link: 'See details',
				icon: (
					<FontAwesomeIcon
						icon={faMoneyBill1Wave}
						className='icon'
						style={{
							backgroundColor: 'rgba(128, 0, 128, 0.2)',
							color: 'purple',
						}}
					/>
				),
			};

			break;
		default:
			break;
	}

	return (
		<div className='widget'>
			<div className='left'>
				<span className='title'>{data.title}</span>
				<span className='counter'>
					{data.isMoney && '$'} {amount}
				</span>
				<Link to={`/dashboard/${type}`} className='link'>
					{data.link}
				</Link>
			</div>
			<div className='right'>
				<div className='percentage positive'>
					<KeyboardArrowUpIcon />
					{diff} %
				</div>
				{data.icon}
			</div>
		</div>
	);
};

export default Widget;
