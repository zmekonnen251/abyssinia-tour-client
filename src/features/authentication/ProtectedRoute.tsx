import { useAppSelector } from '../../store/hooks';
import { Navigate, Outlet } from 'react-router-dom';
import { currentUser } from './components/authSlice';

const ProtectedRoute = () => {
	const user = useAppSelector(currentUser);

	return user ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
