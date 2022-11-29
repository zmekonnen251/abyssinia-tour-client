import React from 'react';
import imgSrc1 from '../../assets/img/nat-1-large.jpg';
import imgSrc2 from '../../assets/img/nat-2-large.jpg';
import imgSrc3 from '../../assets/img/nat-3-large.jpg';

const About: React.FC = () => {
	return (
		<section className='section-about'>
			<div className='u_padding_top_small' id='about'>
				<div className='u_center_text u_margin_bottom_big'>
					<h2 className='heading-secondary'>
						Exiting tours for adventurous people
					</h2>
				</div>

				<div className='row'>
					<div className='col-1-of-2'>
						<h3 className='heading-tertiary u_margin_bottom_small'>
							You're going to fall in love with nature
						</h3>
						<p className='paragraph'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
							beatae quam perferendis ipsam aperiam, placeat nulla fugiat,
							repellat distinctio fugit adipisci similique architecto facilis
							minima, eligendi asperiores qui. Earum, ratione!
						</p>

						<h3 className='heading-tertiary u-margin-bottom-small'>
							Live adventures like you never have before
						</h3>
						<p className='paragraph'>
							Adventure is the most important thing in life. It is the most
							exciting and the most dangerous thing. It is the most exciting and
							the most dangerous thing.
						</p>

						<a href='#LearnMore' className='btn-text'>
							{' '}
							Learn more &#10132;{' '}
						</a>
					</div>
					<div className='col-1-of-2'>
						<div className='composition'>
							<img
								src={imgSrc1}
								alt='natourous destinations 1'
								className='composition__photo composition__photo--p1'
							/>
							<img
								src={imgSrc2}
								alt='natourous destinations 2'
								className='composition__photo composition__photo--p2'
							/>
							<img
								src={imgSrc3}
								alt='natourous destinations 3'
								className='composition__photo composition__photo--p3'
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
