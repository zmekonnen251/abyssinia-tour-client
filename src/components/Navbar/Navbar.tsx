import React from 'react';
import './Navbar.scss';

const Navbar = () => {
	return (
		<div className='navigation'>
			<input
				type='checkbox'
				className='navigation__checkbox'
				id='navi-toggle'
			/>
			<label htmlFor='navi-toggle' className='navigation__button'>
				<span className='navigation__icon'>&nbsp;</span>
			</label>
			<div className='navigation__background'>&nbsp;</div>
			<nav className='navigation__nav'>
				<ul className='navigation__list'>
					<li className='navigation__item'>
						<a href='aaa' className='navigation__link'>
							01 &nbsp;About Natours
						</a>
					</li>
					<li className='navigation__item'>
						<a href='aaa' className='navigation__link'>
							02 &nbsp;Your benefits
						</a>
					</li>
					<li className='navigation__item'>
						<a href='aaa' className='navigation__link'>
							03 &nbsp;Popular tours
						</a>
					</li>
					<li className='navigation__item'>
						<a href='aaa' className='navigation__link'>
							04 &nbsp;Stories
						</a>
					</li>
					<li className='navigation__item'>
						<a href='aaa' className='navigation__link'>
							05 &nbsp;Book now
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
