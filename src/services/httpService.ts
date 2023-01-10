import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
// import { apiEndPoint } from '../config.json';
// import logger from './logService';

const API = axios.create(
	// {baseURL: apiEndPoint},
	{
		withCredentials: true,
	}
);

API.interceptors.request.use(
	(req) => {
		const data = Cookies.get('accessToken');
		if (data === 'loggedout' || data === undefined) return req;

		req.headers!.Authorization = `Bearer ${data}`;

		// console.log(req.headers.authorization);
		// console.log(req);
		return req;
	},
	(error) => {
		const expectedError =
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500;

		if (!expectedError) {
			console.log(error);
			// toast.error('An unexpected error occurred.');
		}

		return Promise.reject(error);
	}
);

export default API;
