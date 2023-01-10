import React from 'react';

type ErrorMessageProps = {
	error?: string;
	visible: boolean;
};

const ErrorMessage = ({ error, visible }: ErrorMessageProps) => {
	if (!visible || !error) return null;

	return <p style={{ fontSize: '1rem', color: 'red' }}> {error}</p>;
};

export default ErrorMessage;
