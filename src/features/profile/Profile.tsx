import React, { useEffect } from 'react';
import Header from '../../layouts/Header/Header';
import { useAppSelector } from '../../app/hooks';
import UpdateUserForm from './UpdateUserForm';
import UpdatePasswordForm from './UpdatePasswordForm';
import ProfileSideBar from './ProfileSideBar';
import useAuth from '../../hooks/useAuth';

const Profile = () => {
	const user = useAuth()

	return (
		<>
			<Header />

			<div className='user-view'>
				<ProfileSideBar />
				<div className='user-view__content'>
					<div className='user-view__form-container'>
						<h2 className='heading-secondary ma-bt-md'>
							Your account settings
						</h2>

						<UpdateUserForm
							name={user?.name as string}
							email={user?.email as string}
							photo={user?.photo as string}
						/>
					</div>
					<div className='line'>&nbsp;</div>
					<UpdatePasswordForm />
				</div>
			</div>
		</>
	);
};

export default Profile;
