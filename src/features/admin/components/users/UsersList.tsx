import Datatable from '../datatable/Datatable';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getAllUsers, fetchUsers, deleteUser } from './usersSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { userRows, userColumns } from '../../datatablesource';

const userColumns = [
	{ field: 'id', headerName: 'ID', width: 40 },
	{
		field: 'user',
		headerName: 'User',
		width: 200,
		renderCell: (params: any) => {
			return (
				<div className='cellWithImg cell'>
					<img
						className='cellImg'
						src={`${process.env.REACT_APP_PUBLIC_URL}/img/users/${params.row.photo}`}
						alt='avatar'
					/>
					{params.row.name}
				</div>
			);
		},
	},
	{
		field: 'email',
		headerName: 'Email',
		width: 190,

		renderCell: (params: any) => {
			return (
				<div className={`cellWithEmail ${params.row.email} cell`}>
					{params.row.email}
				</div>
			);
		},
	},
	{
		field: 'active',
		headerName: 'Active',
		width: 100,
		renderCell: (params: any) => {
			return (
				<div className={`cellWithActive ${params?.row?.active} cell`}>
					{params?.row?.active ? 'Active' : 'Not Active'}
				</div>
			);
		},
	},
	{
		field: 'role',
		headerName: 'Role',
		width: 100,
		renderCell: (params: any) => {
			return (
				<div className={`cellWithRole ${params?.row?.role} cell`}>
					{params?.row?.role}
				</div>
			);
		},
	},
	{
		field: 'createdAt',
		headerName: 'Modified At',
		width: 100,
		renderCell: (params: any) => {
			return (
				<div className={`cellWithRole ${params?.row?.modifiedAt} cell`}>
					{new Date(params?.row?.modifiedAt).toDateString()}
				</div>
			);
		},
	},
];

const UserList = () => {
	const navigate = useNavigate();
	const usersData = useAppSelector(getAllUsers);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	const handleView = (id: string) => {};

	const handleUpdate = (id: string) => {
		navigate(`/dashboard/users/edit/${id}`);
	};

	const handleDelete: any = (id: string) => {
		dispatch(deleteUser(id));
	};

	return (
		<div className='userList'>
			<Datatable
				name='users'
				rows={usersData}
				columns={userColumns}
				onDelete={handleDelete}
				onView={handleView}
				onUpdate={handleUpdate}
			/>
		</div>
	);
};

export default UserList;
