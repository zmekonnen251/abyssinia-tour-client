import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRouteAdmin = () => {
	const { isAdmin } = useAuth();

	return isAdmin ? <Outlet /> : <Navigate to='/profile' />;
};

export default ProtectedRouteAdmin;
