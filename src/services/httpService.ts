import axios from 'axios';
// import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import logger from './logService';

const API = axios.create({
	baseURL: 'http://localhost:5000/api/v1',
	withCredentials: true,
});

API.interceptors.request.use(
	(req) => {
		const data = Cookies.get('accessToken');
		if (data === 'loggedout' || data === undefined) return req;

		req.headers!.Authorization = `Bearer ${data}`;

		return req;
	},
	(error) => {
		const expectedError =
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500;

		if (!expectedError) {
			logger.log(error);
			toast.error('An unexpected error occurred.');
		}

		return Promise.reject(error);
	}
);

API.interceptors.response.use(
	(res) => {
		if (res?.data?.accessToken) {
			Cookies.set('accessToken', res?.data?.accessToken);
		}
		return res;
	},
	(error) => {
		const expectedError =
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500;

		if (!expectedError) {
			logger.log(error);
			toast.error('An unexpected error occurred.');
		}

		return Promise.reject(error);
	}
);

export default API;
