import API from './httpService';

export const resetPassword = async (resetToken, passwordData) => {
	const { data } = await API.post(
		`/auth/reset-password/${resetToken}`,
		passwordData
	);
	return data;
};
