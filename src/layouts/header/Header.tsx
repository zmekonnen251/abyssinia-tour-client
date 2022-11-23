import React from 'react';
import logoSrc from '../../assets/img/logo-white.png';
import styles from './Header.module.scss';

const Header: React.FC = () => {
	return (
		<header className={styles.header}>
			<div className={styles.headerLogoBox}>
				<img src={logoSrc} alt='Logo' className={styles.headerLogo} />
			</div>
			<div className={styles.headerTextBox}>
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
