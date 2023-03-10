import './new.scss';
// import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
// import { useState } from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { createUser } from './usersSlice';
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
// import { SubmitButton } from '../../../components/form';

interface IFormInputs {
	email: string;
	password: string;
	name: string;
	passwordConfirm: string;
	role: 'user' | 'guide' | 'lead-guide' | 'admin';
}

const validationSchema = Yup.object().shape({
	name: Yup.string().min(4).required('Name is required'),
	email: Yup.string().email('Email not valid').required('Email is required'),
	password: Yup.string()
		.min(8, 'The length of your password must be 8 chracters long.')
		.required('Password is required'),
	passwordConfirm: Yup.string().oneOf(
		[Yup.ref('password'), null],
		'Passwords must match'
	),
	role: Yup.string()
		.oneOf(['user', 'guide', 'lead-guide', 'admin'])
		.required('Role is required'),
});

const CreateUser = () => {
	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors, isSubmitting, touchedFields },
	} = useForm<IFormInputs>({
		resolver: yupResolver(validationSchema),
	});

	const dispatch = useAppDispatch();

	const onSubmit = async (values: IFormInputs) => {
		console.log(values);
		await dispatch(createUser(values));
		reset();
	};

	return (
		<div className='newContainer'>
			<div className='top'>
				<h1>Create User</h1>
			</div>
			<div className='bottom'>
				<div className='right'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='formInput'>
							<TextField
								label='Name'
								type='text'
								placeholder='Full Name'
								id='name'
								fullWidth
								{...register('name')}
							/>
							<ErrorMessage errors={errors} name='name' as='p' />
						</div>

						<div className='formInput'>
							<TextField
								label='Email'
								type='text'
								placeholder='Full Name'
								fullWidth
								id='email'
								{...register('email')}
							/>
							<ErrorMessage errors={errors} name='name' as='p' />
						</div>

						<div className='formInput'>
							<TextField
								fullWidth
								label='Password'
								type='password'
								placeholder='**********'
								id='password'
								{...register('password')}
							/>
							<ErrorMessage errors={errors} name='name' as='p' />
						</div>

						<div className='formInput'>
							<TextField
								fullWidth
								label='Password'
								type='password'
								placeholder='**********'
								id='passwordConfirm'
								{...register('passwordConfirm')}
							/>
							<ErrorMessage errors={errors} name='passwordConfirm' as='p' />
						</div>
						<div className='formInput'>
							<FormControl>
								<InputLabel id='role'>Role</InputLabel>
								<Select
									labelId='role'
									id='role'
									{...register('role')}
									defaultValue={getValues('role')}
									label='Role'
									sx={{ width: '100px' }}
								>
									<MenuItem value='user'>User</MenuItem>
									<MenuItem value='guide'>Guide</MenuItem>
									<MenuItem value='lead-guide'>Lead Guide</MenuItem>
									<MenuItem value='admin'>Admin</MenuItem>
								</Select>
							</FormControl>
							<ErrorMessage errors={errors} name='role' />
						</div>
						<div className='formInput'></div>

						<SubmitButton
							type='submit'
							title='Create User'
							disabled={
								isSubmitting ||
								(errors.email && touchedFields.email) ||
								(errors.password && touchedFields.password) ||
								(errors.passwordConfirm && touchedFields.passwordConfirm) ||
								(errors.name && touchedFields.name)
							}
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateUser;
