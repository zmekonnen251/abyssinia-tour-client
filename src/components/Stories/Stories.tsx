import React from 'react';
import Story from './Story/Story';
import bgVideoMp4 from '../../assets/img/video.mp4';
import bgVideoWebm from '../../assets/img/video.webm';

const Stories = () => {
	return (
		<section className='section-stories' id='stories'>
			<div className='bg-video'>
				<video className='bg-video__content' autoPlay muted loop>
					<source src={bgVideoMp4} type='video/mp4' />
					<source src={bgVideoWebm} type='video/webm' />
					Your browser is not supported!
				</video>
			</div>
			<div className='u_center_text u_margin_bottom_big'>
				<h2 className='heading-secondary'>We make people genuinely happy</h2>
			</div>

			<Story />
			<Story />

			<div className='u_center_text u_margin_top_huge'>
				<a href='#ab' className='btn-text'>
					Read all stories &#10132;
				</a>
			</div>
		</section>
	);
};

export default Stories;
