import jwtDecode from 'jwt-decode';
import { User } from '../types/models';
import Cookies from 'js-cookie';

const useAuth = () => {
	const token = Cookies.get('accessToken');
	let isAdmin = false;

	if (token && !(token ==='loggedout' || token === undefined)) {
		const decoded = jwtDecode(token) as User;
		const { name, email, role, _id, photo } = decoded;

		isAdmin = role === 'admin';

		return { name, email, photo, role, _id, isAdmin, isLoggedIn: true };
	}

	return {
		name: '',
		email: '',
		photo: '',
		role: '',
		isAdmin,
		isLoggedIn: false,
	};
};
export default useAuth;
