import './new.scss';
// import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
// import { useState } from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { createTour } from '../../../tours/toursSlice';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';
import { SubmitButton } from '../../../../components/form';
import { TextField } from '@mui/material';
// import { SubmitButton } from '../../../components/form';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import size from 'react-element-popper/animations/size';
interface IFormInputs {
	name: string;
	summary: string;
	duration: number;
	startDates: Date[];
	maxGroupSize: number;
	price: number;
}

const validationSchema = Yup.object().shape({
	name: Yup.string().min(8).required('Name is required'),
	summary: Yup.string().min(15).required('Summary is required'),
	duration: Yup.number().min(1).required('Duration is required'),
	price: Yup.number().min(5).required('Price is required'),
	maxGroupSize: Yup.number().min(1).required('Max Group Size is required'),
	startDates: Yup.array().min(1).required('Start Date is required'),
});

const CreateTour = () => {
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors, isSubmitting },
	} = useForm<IFormInputs>({
		resolver: yupResolver(validationSchema),
	});

	const dispatch = useAppDispatch();

	const onSubmit = async (values: IFormInputs) => {
		console.log(values);
		// const dates = startDates as Date[];
		// const updatedValues = {
		// 	summary: values.summary,
		// 	duration: values.duration,
		// 	maxGroupSize: values.maxGroupSize,
		// 	price: values.price,
		// 	name: values.name,
		// 	startDates: dates,
		// };
		console.log(values['startDates']);

		await dispatch(createTour(values));
		reset();
	};

	return (
		<div className='newContainer'>
			<div className='top'>
				<h1>Create Tour</h1>
			</div>
			<div className='bottom'>
				<div className='right'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='formInput'>
							<TextField
								label='Tour Name'
								type='text'
								placeholder='Tour Name'
								id='name'
								{...register('name')}
								fullWidth
							/>
							<ErrorMessage errors={errors} name='name' as='p' />
						</div>

						<div className='formInput'>
							<TextField
								label='Duration'
								type='number'
								placeholder='Duration'
								id='duration'
								{...register('duration')}
								fullWidth
							/>
							<ErrorMessage errors={errors} name='duration' as='p' />
						</div>
						<div className='formInput'>
							<TextField
								label='Price'
								type='number'
								placeholder='Price'
								id='price'
								{...register('price')}
								fullWidth
							/>
							<ErrorMessage errors={errors} name='price' as='p' />
						</div>
						<div className='formInput'>
							<TextField
								label='Summary'
								type='text'
								placeholder='Summary'
								id='summary'
								{...register('summary')}
								fullWidth
							/>

							<ErrorMessage errors={errors} name='summary' as='p' />
						</div>
						<div className='formInput'>
							<TextField
								label='Max Group Size'
								type='number'
								placeholder='Max Group Size'
								id='maxGroupSize'
								{...register('maxGroupSize')}
								fullWidth
							/>

							<ErrorMessage errors={errors} name='maxGroupSize' as='p' />
						</div>
						<div className='formInput'>
							{/* <DatePicker
								multiple
								animations={[size()]}
								onChange={setStartDates}
								plugins={[<DatePanel />]}
								style={{ width: '200px', padding: '0 10px' }}
							/> */}
							{/* <TextField
								label='Start Dates'
								type='text'
								variant='outlined'
								id='startDate'
								{...register('startDate')}
								fullWidth
							/> */}
							<Controller
								control={control}
								name='startDates'
								render={({
									field: { onChange, value },
									fieldState: { invalid, isDirty }, //optional
									formState: { errors }, //optional, but necessary if you want to show an error message
								}) => (
									<>
										<DatePicker
											multiple
											animations={[size()]}
											plugins={[<DatePanel />]}
											style={{ padding: ' 20px' }}
											placeholder='Start Dates'
											value={value || ''}
											onChange={(date) => {
												onChange(date);
											}}
										/>
										{errors['startDates'] && (
											<p className='error'>{errors['startDates'].message}</p>
										)}
									</>
								)}
							/>
						</div>

						<SubmitButton
							type='submit'
							title='Create Tour'
							disabled={isSubmitting}
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateTour;
