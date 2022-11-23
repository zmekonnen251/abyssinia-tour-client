import React from 'react';
import './Story.scss';
import storyImgSrc from '../../../assets/img/nat-8.jpg';

const Story = () => {
	return (
		<div className='row'>
			<div className='story'>
				<figure className='story__shape'>
					<img
						src={storyImgSrc}
						alt='Person on a tour'
						className='story__img'
					/>
					<figcaption className='story__caption'>Mary Smith</figcaption>
				</figure>
				<div className='story__text'>
					<h3 className='heading-tertiary u_margin_bottom_small'>
						I had the best week ever with my family
					</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
						quae.Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Quisquam, quae.Lorem ipsum dolor sit amet consectetur adipisicing
						elit. Quisquam, quae.Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Quisquam, quae.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Story;
