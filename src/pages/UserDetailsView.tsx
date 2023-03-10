import AdminDashboard from '../layouts/AdminDashboard/AdminDashBoard';
import UserDetails from '../features/admin/components/UserDetails';
import { useParams } from 'react-router-dom';

const UserDetailsView = () => {
	const { userId } = useParams<{ userId: string }>();

	return (
		<AdminDashboard>
			<UserDetails id={userId as string} />
		</AdminDashboard>
	);
};

export default UserDetailsView;
