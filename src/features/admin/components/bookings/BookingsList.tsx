import Datatable from '../datatable/Datatable';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
	deleteBooking,
	getAllBookings,
	selectBookings,
} from '../../../tours/bookingsSlice';
import { useEffect } from 'react';

// import { useNavigate } from 'react-router-dom';
// import { userRows, userColumns } from '../../datatablesource';

const bookingsColumns = [
	{ field: 'id', headerName: 'ID', width: 40 },
	{
		field: 'tour',
		headerName: 'Tour',
		width: 200,
		renderCell: (params: any) => {
			return <div className='cellWithImg cell'>{params?.row?.tour?.name}</div>;
		},
	},
	{
		field: 'user',
		headerName: 'User',
		width: 190,

		renderCell: (params: any) => {
			return (
				<div className={`cellWithImg cell`}>
					<img
						className='cellImg'
						src={`/img/users/${params.row.user.photo}`}
						alt='avatar'
					/>
					{params?.row?.user?.name}
				</div>
			);
		},
	},
	{
		field: 'paid',
		headerName: 'Paid',
		width: 100,
		renderCell: (params: any) => {
			return (
				<div className={`cellWithActive ${params?.row?.paid} cell`}>
					{params?.row?.paid ? 'Paid' : 'Not Paid'}
				</div>
			);
		},
	},
	{
		field: 'price',
		headerName: 'Price',
		width: 100,
		renderCell: (params: any) => {
			return <div className={`cellWithPrice cell`}>{params?.row?.price}</div>;
		},
	},
	{
		field: 'createdAt',
		headerName: 'Created At',
		width: 100,
		renderCell: (params: any) => {
			return (
				<div className={`cellWithCreatedAt ${params?.row?.createdAt} cell`}>
					{new Date(params?.row?.createdAt).toDateString()}
				</div>
			);
		},
	},
];

const BookingsList = () => {
	// const navigate = useNavigate();
	const bookings = useAppSelector(selectBookings);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!bookings.length) dispatch(getAllBookings());
	}, [bookings.length, dispatch]);

	console.log('bookings', bookings);
	const handleView = (id: string) => {};

	const handleUpdate = (id: string) => {
		// navigate(`/dashboard/users/edit/${id}`);
	};

	const handleDelete: any = (id: string) => {
		dispatch(deleteBooking(id));
	};

	return (
		<div className='userList'>
			<Datatable
				name='bookings'
				rows={bookings}
				columns={bookingsColumns}
				onDelete={handleDelete}
				onView={handleView}
				onUpdate={handleUpdate}
			/>
		</div>
	);
};

export default BookingsList;
