import React from 'react';
import './UserDetails.scss';
import Chart from './chart/Chart';
import { useAppSelector } from '../../../app/hooks';
import { getAllUsers } from './users/usersSlice';

type UserDetailsProps = {
	id: string;
};

const UserDetails = ({ id }: UserDetailsProps) => {
	const users = useAppSelector(getAllUsers);
	const user = users.find((user) => user._id === id);

	const onEdit = () => {
		console.log('Edit');
	};

	return (
		<div className='singleContainer'>
			<div className='top'>
				<div className='left'>
					<button className='editButton' onClick={onEdit}>
						Edit
					</button>
					<h1 className='title'>Information</h1>
					<div className='item'>
						<img
							src={`/img/users/${user?.photo}`}
							alt={user?.name}
							className='itemImg'
						/>
						<div className='details'>
							<h1 className='itemTitle'>{user?.name}</h1>
							<div className='detailItem'>
								<span className='itemKey'>Email:</span>
								<span className='itemValue'>{user?.email}</span>
							</div>
							<div className='detailItem'>
								<span className='itemKey'>Status:</span>
								<span className='itemValue'>
									{user?.active ? 'Active' : 'Not Active'}
								</span>
							</div>
							<div className='detailItem'>
								<span className='itemKey'>Address:</span>
								<span className='itemValue'>---</span>
							</div>
							<div className='detailItem'>
								<span className='itemKey'>Country:</span>
								<span className='itemValue'>----</span>
							</div>
						</div>
					</div>
				</div>
				<div className='right'>
					<Chart aspect={3 / 1} title='User Spending ( Last 6 Months)' />
				</div>
			</div>
			<div className='bottom'>
				<h1 className='title'>Last Transactions</h1>
				{/* <List /> */}
			</div>
		</div>
	);
};

export default UserDetails;
