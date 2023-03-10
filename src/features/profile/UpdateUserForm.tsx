import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';

import { SubmitButton } from '../../components/form';
import { useAppDispatch } from '../../app/hooks';
import { updateMe } from '../authentication/authSlice';

interface IFormInputs {
	email: string;
	name: string;
	photo: File;
}

type UpdateUserFormProps = {
	name: string;
	email: string;
	photo: string;
};

const validationSchema = Yup.object().shape({
	name: Yup.string().min(4),
	email: Yup.string().email('Email not valid'),
	photo: Yup.mixed(),
});

const UpdateUserForm = ({
	name,
	email,
	photo: userPhoto,
}: UpdateUserFormProps) => {
	const {
		register,
		handleSubmit,

		formState: { errors, isSubmitting, touchedFields },
	} = useForm<IFormInputs>({
		defaultValues: {
			name,
			email,
			photo: undefined,
		},
		resolver: yupResolver(validationSchema),
	});

	const [file, setFile] = useState<File | null>(null);

	const dispatch = useAppDispatch();

	const onSubmit = async (values: IFormInputs) => {
		console.log(values);
		const formData = new FormData();
		if (values.name !== name) formData.append('name', values.name);
		if (values.email !== email) formData.append('email', values.email);
		if (values.photo) formData.append('photo', values.photo[0] as any);

		await dispatch(updateMe(formData));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='form form-user-data'>
			<div className='form__group'>
				<label className='form__label' htmlFor='name'>
					Name
				</label>
				<input
					className='form__input'
					id='name'
					type='text'
					{...register('name')}
				/>

				<ErrorMessage errors={errors} name='name' as='p' />
			</div>
			<div className='form__group'>
				<label className='form__label' htmlFor='name'>
					Email
				</label>
				<input
					className='form__input'
					id='email'
					type='email'
					{...register('email')}
				/>

				<ErrorMessage errors={errors} name='email' as='p' />
			</div>

			<div className='form__group form__photo-upload'>
				<img
					className='form__user-photo'
					src={
						file
							? URL.createObjectURL(file)
							: `${process.env.REACT_APP_PUBLIC_URL}/img/users/${userPhoto}`
					}
					alt='User'
				/>
				<label className='btn-text' htmlFor='photo'>
					Choose new photo
				</label>
				<input
					id='photo'
					type='file'
					accept='image/*'
					style={{
						textIndent: '-90px',
						opacity: touchedFields?.photo ? 1 : 0,
						color: '#4a2a2a',
					}}
					{...register('photo')}
					onChange={(e) => setFile(e.target.files![0])}
				/>
			</div>
			<ErrorMessage errors={errors} name='photo' as='p' />
			<SubmitButton
				title='Save Settings'
				type='submit'
				disabled={
					isSubmitting ||
					(errors.email && touchedFields.email) ||
					(errors.name && touchedFields.name) ||
					(errors.photo && touchedFields.photo)
				}
			/>
		</form>
	);
};

export default UpdateUserForm;
