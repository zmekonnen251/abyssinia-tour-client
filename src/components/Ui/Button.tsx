import React from 'react';

type ButtonProps = {
	onClick?: () => void;
	title: string;
	color: 'white' | 'green';
	variant: 'contained' | 'text';
	type?: 'submit' | 'button';
	disabled?: boolean;
};

const Button = ({
	onClick,
	title,
	color,
	variant,
	type,
	disabled,
}: ButtonProps) => {
	const cls = `${
		variant === 'contained' ? 'btn' : variant === 'text' ? 'btn-text' : 'btn'
	} btn--${color}`;
	return (
		<button
			onClick={onClick}
			className={`btn ${cls}`}
			type={type}
			disabled={disabled}
		>
			{title}
		</button>
	);
};

export default Button;
