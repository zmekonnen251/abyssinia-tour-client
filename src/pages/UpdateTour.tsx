import AdminDashboard from '../layouts/AdminDashboard/AdminDashBoard';
import EditTour from '../features/admin/components/tours/EditTour';
import { useParams } from 'react-router-dom';

const UserDetailsView = () => {
	const { tourId } = useParams<{ tourId: string }>();

	return (
		<AdminDashboard>
			<EditTour id={tourId as string} />
		</AdminDashboard>
	);
};

export default UserDetailsView;
