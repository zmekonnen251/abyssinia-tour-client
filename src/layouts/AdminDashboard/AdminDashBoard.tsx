import Sidebar from '../../features/admin/components/sidebar/Sidebar';
import Header from '../Header/Header';

const AdminDashboard = ({ children }) => {
	return (
		<>
			<Header />

			<div className='admin-dashboard'>
				<Sidebar />
				<div className='admin-dashboard__container'>{children}</div>
			</div>
		</>
	);
};

export default AdminDashboard;
