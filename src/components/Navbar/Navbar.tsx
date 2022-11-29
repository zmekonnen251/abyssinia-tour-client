import React, { useState } from 'react';

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleNavShow = () => {
		setIsMenuOpen(!isMenuOpen);
	};

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
								onClick={handleNavShow}
							>
								01 &nbsp;About Natours
							</a>
						</li>
						<li className='navigation__item'>
							<a
								href='#tours'
								className='navigation__link'
								onClick={handleNavShow}
							>
								02 &nbsp;Your benefits
							</a>
						</li>
						<li className='navigation__item'>
							<a
								href='#tours'
								className='navigation__link'
								onClick={handleNavShow}
							>
								03 &nbsp;Popular tours
							</a>
						</li>
						<li className='navigation__item'>
							<a
								href='#stories'
								className='navigation__link'
								onClick={handleNavShow}
							>
								04 &nbsp;Stories
							</a>
						</li>
						<li className='navigation__item'>
							<a
								href='#book'
								className='navigation__link'
								onClick={handleNavShow}
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
