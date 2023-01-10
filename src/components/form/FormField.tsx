import React from 'react';
import { useFormikContext, Field } from 'formik';
import ErrorMessage from './ErrorMessage';

type FormFieldProps = {
	name: string;
	label: string;
	value: any;
	error?: string;

	[x: string]: any;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const FormField = ({
	label,
	name,
	value,
	onBlur,
	onChange,
	error,
	...otherProps
}: FormFieldProps) => {
	return (
		<div className='form__group'>
			<label htmlFor={name} className='form__label'>
				{label}
			</label>
			<input
				id={name}
				className='form__input'
				name={name}
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				// value={values[name]}
				{...otherProps}
			/>
			<ErrorMessage error={error} visible={error ? true : false} />
		</div>
	);
};

export default FormField;
