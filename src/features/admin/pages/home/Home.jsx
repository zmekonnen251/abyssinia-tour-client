import Sidebar from '../../components/sidebar/Sidebar';
import './home.scss';
import Widget from '../../components/widget/Widget';
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
import Table from '../../components/table/Table';
import Header from '../../../../layouts/Header/Header';
import { selectAllTours, fetchTours } from '../../../tours/toursSlice';
import { getAllUsers, fetchUsers } from '../../components/users/usersSlice';
import { getAllBookings, selectBookings } from '../../../tours/bookingsSlice';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';

const Home = () => {
	const dispatch = useAppDispatch();
	const allTours = useAppSelector(selectAllTours);
	const allUsers = useAppSelector(getAllUsers);
	const allBookings = useAppSelector(selectBookings);

	useEffect(() => {
		if (allTours.length === 0) {
			dispatch(fetchTours());
		}
		if (allUsers.length === 0) {
			dispatch(fetchUsers());
		}
		if (allBookings.length === 0) {
			dispatch(getAllBookings());
		}
	}, [allTours, allUsers, allBookings, dispatch]);

	return (
		<>
			<Header />
			<div className='home'>
				<Sidebar />
				<div className='homeContainer'>
					{/* <Navbar /> */}

					<div className='widgets'>
						<Widget type='users' amount={allUsers?.length} />
						<Widget type='tours' amount={allTours?.length} />
						<Widget type='bookings' amount={allBookings?.length} />
						<Widget
							type='earning'
							amount={allBookings?.reduce((acc, item) => acc + item.price, 0)}
						/>
						<Widget
							type='balance'
							amount={allBookings?.reduce((acc, item) => acc + item.price, 0)}
						/>
					</div>
					<div className='charts'>
						<Featured
							amount={allBookings?.reduce(
								(acc, item) =>
									new Date(item?.createdAt).getDate() ===
										new Date().getDate() && acc + item.price,
								0
							)}
						/>
						<Chart title='Last 6 Months (Revenue)' aspect={2 / 1} />
					</div>
					<div className='listContainer'>
						<div className='listTitle'>Latest Transactions</div>
						<Table />
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
