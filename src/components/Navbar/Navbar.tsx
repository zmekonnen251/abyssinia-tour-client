import React, { useEffect, useState } from 'react';
import './Navbar.scss';

const initialNavStyle = {
	opacity: 0,
	width: '0',
};
const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [navLinkActive, setNavLinkActive] = useState(false);
	// const [check, setCheck] = useState(false);
	// const [navStyle, setNavStyle] = useState(initialNavStyle);
	// const [backGroundColor, setBackGroundColor] = useState(');

	const handleNavShow = () => {
		setIsMenuOpen(!isMenuOpen);
		// const root = document.documentElement;
		// root?.style.setProperty('--scale', 'scale(80)');
		// root?.style.setProperty('--nav-opacity', '1');
		// root?.style.setProperty('--nav-width', '100%');
	};

	useEffect(() => {
		if (navLinkActive) {
			// const root = document.documentElement;
			// root?.style.setProperty('--scale', 'scale(0)');
			// root?.style.setProperty('--nav-opacity', '0');
			// root?.style.setProperty('--nav-width', '0');
			setIsMenuOpen(false);
			setNavLinkActive(false);
		}
	}, [navLinkActive]);

	// console.log(document.getElementById('navlink1'));
	// const link = document.querySelectorAll('.navigation__link')[0];
	// document.get;
	// console.log(link);

	return (
		<div className='navigation'>
			<input
				type='checkbox'
				className='navigation__checkbox'
				id='navi-toggle'
				checked={isMenuOpen}
			/>
			<label
				htmlFor='navi-toggle'
				className='navigation__button'
				onClick={handleNavShow}
			>
				<span className='navigation__icon'>&nbsp;</span>
			</label>
			<>
				<div className='navigation__background'>&nbsp;</div>
				<nav className='navigation__nav'>
					<ul className='navigation__list'>
						<li className='navigation__item'>
							<a
								id='navlink1'
								href='#about'
								className='navigation__link'
								onClick={() => setNavLinkActive(true)}
							>
								01 &nbsp;About Natours
							</a>
						</li>
						<li className='navigation__item'>
							<a
								href='#tours'
								className='navigation__link'
								onClick={() => setNavLinkActive(true)}
							>
								02 &nbsp;Your benefits
							</a>
						</li>
						<li className='navigation__item'>
							<a
								href='#tours'
								className='navigation__link'
								onClick={() => setNavLinkActive(true)}
							>
								03 &nbsp;Popular tours
							</a>
						</li>
						<li className='navigation__item'>
							<a
								href='#stories'
								className='navigation__link'
								onClick={() => setNavLinkActive(true)}
							>
								04 &nbsp;Stories
							</a>
						</li>
						<li className='navigation__item'>
							<a
								href='#book'
								className='navigation__link'
								onClick={() => setNavLinkActive(true)}
							>
								05 &nbsp;Book now
							</a>
						</li>
					</ul>
				</nav>
			</>
		</div>
	);
};

export default Navbar;
