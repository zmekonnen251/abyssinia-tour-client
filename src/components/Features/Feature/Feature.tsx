import React from 'react';

type FeatureProps = {
	heading: String;
	text: String;
	icon: String;
};

const Feature = ({ heading, text, icon }: FeatureProps) => {
	return (
		<div className='col-1-of-4'>
			<div className='feature-box'>
				<i className={`feature-box__icon ${icon}`}></i>
				<h3 className='heading-tertiary u_margin_bottom_small'>{heading}</h3>
				<p className='feature-box__text'>{text}</p>
			</div>
		</div>
	);
};

export default Feature;
