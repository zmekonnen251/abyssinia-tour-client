import React from 'react';
import Story from './Story/Story';
import styles from './Stories.module.scss';
import bgVideoMp4 from '../../assets/img/video.mp4';
import bgVideoWebm from '../../assets/img/video.webm';

const Stories = () => {
	return (
		<section className={styles.sectionStories}>
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
					Read all stories &rarr;
				</a>
			</div>
		</section>
	);
};

export default Stories;
