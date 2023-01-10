import http from './httpService';

const apiEndpoint = '/tours';

export function getTours() {
	return http.get(apiEndpoint);
}
