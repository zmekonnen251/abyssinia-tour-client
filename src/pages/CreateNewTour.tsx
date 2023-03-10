import AdminDashboard from '../layouts/AdminDashboard/AdminDashBoard';
import CreateTour from '../features/admin/components/tours/CreateTour';

const List = () => {
	return (
		<AdminDashboard>
			<CreateTour />
		</AdminDashboard>
	);
};

export default List;
