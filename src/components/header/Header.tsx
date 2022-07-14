import React from 'react';
import logoSrc from '../../img/logo-white.png';

const Header: React.FC = () => {
	return (
		<header className='header'>
			<div className='header__logo-box'>
				<img src={logoSrc} alt='Logo' className='header__logo' />
			</div>
			<div className='header__text-box'>
				<h1 className='heading-primary'>
					<span className='heading-primary--main'>Outdoors</span>
					<span className='heading-primary--sub'>Is where Life happens</span>
				</h1>
				<a href='#LearnMore' className='btn btn--white btn--animated'>
					Discover our tours
				</a>
			</div>
		</header>
	);
};

export default Header;
