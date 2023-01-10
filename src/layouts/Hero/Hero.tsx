import React from 'react';
import logoSrc from '../../assets/img/logo-white.png';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
	return (
		<header className='hero'>
			<Link to='/tours' className='hero__logo-box'>
				<img src={logoSrc} alt='Logo' className='hero__logo' />
			</Link>
			<div className='hero__text-box'>
				<h1 className='heading-primary'>
					<span className='heading-primary--main'>Outdoors</span>
					<span className='heading-primary--sub'>Is where Life happens</span>
				</h1>
				<Link to='/tours' className='btn btn--white btn--animated'>
					Discover our tours
				</Link>
			</div>
		</header>
	);
};

export default Hero;
