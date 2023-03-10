import Datatable from '../datatable/Datatable';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useEffect } from 'react';
import {
	deleteTour,
	fetchTours,
	selectAllTours,
} from '../../../tours/toursSlice';
import { useNavigate } from 'react-router-dom';
// import { userRows, userColumns } from '../../datatablesource';

const tourColumns = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{
		field: 'tour',
		headerName: 'Tour',
		width: 160,
		renderCell: (params: any) => {
			return <div className='cell'>{params.row.name}</div>;
		},
	},
	{
		field: 'price',
		headerName: 'Price',
		width: 160,

		renderCell: (params: any) => {
			return (
				<div className={`cell ${params.row.price}`}>{params.row.price}</div>
			);
		},
	},
	{
		field: 'difficulty',
		headerName: 'Difficulty',
		width: 90,
		renderCell: (params: any) => {
			return <div className={`cell`}>{params?.row?.difficulty}</div>;
		},
	},
	{
		field: 'public',
		headerName: 'Public',
		width: 90,
		renderCell: (params: any) => {
			return (
				<div className={`cell`}>
					{params?.row?.public ? 'Public' : 'Not Public'}
				</div>
			);
		},
	},
	{
		field: 'duration',
		headerName: 'Duration',
		width: 160,
		renderCell: (params: any) => {
			return (
				<div className={`cell ${params?.row?.duration}`}>
					{params?.row?.duration}
				</div>
			);
		},
	},
];

const ToursList = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const toursData = useAppSelector(selectAllTours);

	const handleDelete = (_id: string) => {
		dispatch(deleteTour(_id));
	};

	useEffect(() => {
		if (toursData?.length === 0) {
			dispatch(fetchTours());
		}
	}, [dispatch, toursData?.length]);

	const handleView = (id: string) => {};

	const handleUpdate = (id: string) => {
		navigate(`/dashboard/tours/edit/${id}`);
	};

	return (
		<div className='userList'>
			<Datatable
				name='tours'
				rows={toursData}
				columns={tourColumns}
				onDelete={handleDelete}
				onView={handleView}
				onUpdate={handleUpdate}
			/>
		</div>
	);
};

export default ToursList;
