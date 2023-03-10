import AdminDashboard from '../layouts/AdminDashboard/AdminDashBoard';
import EditUser from '../features/admin/components/users/EditUser';
import { useParams } from 'react-router-dom';

const UserDetailsView = () => {
	const { userId } = useParams<{ userId: string }>();

	return (
		<AdminDashboard>
			<EditUser id={userId as string} />
		</AdminDashboard>
	);
};

export default UserDetailsView;
