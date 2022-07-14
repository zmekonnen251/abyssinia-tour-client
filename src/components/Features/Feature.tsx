import React, { ReactPropTypes } from 'react';

interface Featured {
	heading: String;
	text: String;
	icon: String;
}

const Feature = (props: Featured) => {
	const { heading, text, icon } = props;

	return (
		<div className='row'>
			<div className='col-1-of-4'>
				<div className='feature-box'>
					<i className={`feature-box__icon ${icon}`}></i>
					<h3 className='heading-tertiary u_margin_bottom_small'>{heading}</h3>
					<p className='feature-box__text'>{text}</p>
				</div>
			</div>
		</div>
	);
};

export default Feature;
