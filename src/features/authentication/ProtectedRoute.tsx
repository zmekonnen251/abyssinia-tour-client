import { Navigate, Outlet } from 'react-router-dom';
// import { currentUser } from './authSlice';
import useAuth from '../../hooks/useAuth';

const ProtectedRoute = () => {
	const { isLoggedIn } = useAuth();

	return isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
