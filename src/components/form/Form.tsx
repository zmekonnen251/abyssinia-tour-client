import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';

type FormProps = {
	initialValues: any;
	onSubmit: (values: any) => void;
	validationSchema: AnyObjectSchema;
	children: React.ReactNode;
};

const Form = ({
	initialValues,
	onSubmit,
	validationSchema,
	children,
}: FormProps) => {
	const methods = useForm({
		defaultValues: {
			...initialValues,
		},
		resolver: yupResolver(validationSchema),
	});
	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
		</FormProvider>
	);
};

export default Form;
