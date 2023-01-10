import React from 'react';
import { Formik, Form } from 'formik';
import { ObjectSchema, AnyObjectSchema } from 'yup';

type AppFormProps = {
	initialValues: any;
	onSubmit: (values: any) => void;
	validationSchema: AnyObjectSchema;
	children: any;
};

const AppForm = ({
	initialValues,
	onSubmit,
	validationSchema,
	children,
}: AppFormProps) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			<Form>{children}</Form>
		</Formik>
	);
};

export default AppForm;
