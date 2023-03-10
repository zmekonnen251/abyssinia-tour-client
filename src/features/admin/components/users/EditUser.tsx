import './new.scss';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { updateUser } from './usersSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';
import { SubmitButton } from '../../../../components/form';
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';

import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';

interface IFormInputs {
	email: string;
	name: string;
	role: 'user' | 'guide' | 'lead-guide' | 'admin' | 'intern';
	photo: File;
}

const validationSchema = Yup.object().shape({
	name: Yup.string().min(4).required('Name is required'),
	email: Yup.string().email('Email not valid').required('Email is required'),
	role: Yup.string().oneOf(['user', 'guide', 'lead-guide', 'admin']),
	photo: Yup.mixed(),
});

type EditUserProps = {
	id: string;
};

const EditUser = ({ id }: EditUserProps) => {
	const user = useAppSelector((state) =>
		state.users.users.find((user) => user._id === id)
	);

	const {
		getValues,
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, touchedFields },
	} = useForm<IFormInputs>({
		defaultValues: {
			name: user?.name,
			email: user?.email,
			role: user?.role,
			photo: undefined,
		},
		resolver: yupResolver(validationSchema),
	});

	const dispatch = useAppDispatch();

	const onSubmit = async (values: IFormInputs) => {
		console.log(values);
		const formData = new FormData();
		if (values.name !== user?.name) formData.append('name', values.name);
		if (values.email !== user?.email) formData.append('email', values.email);
		if (values.photo) formData.append('photo', values.photo[0] as any);
		if (values.role !== user?.role) formData.append('role', values.role);

		await dispatch(
			updateUser({ userData: formData, _id: id, id: user?.id as string })
		);

		reset();
	};

	return (
		<div className='newContainer'>
			<div className='top'>
				<h1>Update User</h1>
			</div>
			<div className='bottom'>
				<div className='left'>
					<img src={`/img/users/${user?.photo}`} alt={user?.name} />
				</div>
				<div className='right'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='formInput'>
							<label htmlFor='photo'>
								Image: <DriveFolderUploadOutlinedIcon className='icon' />
							</label>
							<input
								type='file'
								id='photo'
								accept='image/*'
								{...register('photo')}
								style={{ display: 'none' }}
							/>
						</div>

						<div className='formInput'>
							<TextField
								id='name'
								label='Name'
								variant='outlined'
								fullWidth
								{...register('name')}
							/>
						</div>
						<ErrorMessage errors={errors} name='name' />

						<div className='formInput'>
							<TextField
								id='email'
								type='email'
								label='Email'
								variant='outlined'
								fullWidth
								{...register('email')}
							/>
						</div>
						<ErrorMessage errors={errors} name='email' />

						<div className='formInput'>
							<FormControl fullWidth>
								<InputLabel id='role'>Role</InputLabel>
								<Select
									labelId='role'
									id='role'
									{...register('role')}
									defaultValue={getValues('role')}
									label='Role'
								>
									<MenuItem value='user'>User</MenuItem>
									<MenuItem value='guide'>Guide</MenuItem>
									<MenuItem value='lead-guide'>Lead Guide</MenuItem>
									<MenuItem value='admin'>Admin</MenuItem>
								</Select>
							</FormControl>
							<ErrorMessage errors={errors} name='role' />
						</div>

						<SubmitButton
							title='Update User'
							disabled={
								isSubmitting ||
								!touchedFields ||
								Object.keys(touchedFields).length === 0
							}
							type='submit'
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditUser;
