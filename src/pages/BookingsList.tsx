import AdminDashboard from '../layouts/AdminDashboard/AdminDashBoard';
import BookingsList from '../features/admin/components/bookings/BookingsList';

const List = () => {
	return (
		<AdminDashboard>
			<BookingsList />
		</AdminDashboard>
	);
};

export default List;
