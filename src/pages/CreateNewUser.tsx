import AdminDashboard from '../layouts/AdminDashboard/AdminDashBoard';
import CreateUser from '../features/admin/components/users/CreateUser';

const List = () => {
	return (
		<AdminDashboard>
			<CreateUser />
		</AdminDashboard>
	);
};

export default List;
