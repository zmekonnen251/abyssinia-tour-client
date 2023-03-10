import AdminDashboard from '../layouts/AdminDashboard/AdminDashBoard';
import UsersList from '../features/admin/components/users/UsersList';

const List = () => {
	return (
		<AdminDashboard>
			<UsersList />
		</AdminDashboard>
	);
};

export default List;
