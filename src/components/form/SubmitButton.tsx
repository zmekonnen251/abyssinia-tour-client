import React from 'react';
import Button from '../Ui/Button';
import { useFormContext } from 'react-hook-form';

type SubmitButttonProps = {
	title: string;
	[x: string]: any;
};
const SubmitButton = ({ title, ...otherProps }: SubmitButttonProps) => {
	// const { formState } = useFormContext();
	return (
		<div className='form__group'>
			<Button
				title={title}
				color='green'
				variant='contained'
				type='submit'
				{...otherProps}
			/>
		</div>
	);
};

export default SubmitButton;
