import logoSrc2x from '../../assets/img/logo-green-2x.png';
import logoSrc1x from '../../assets/img/logo-green-1x.png';
import logoSrcSmall1x from '../../assets/img/logo-green-small-1x.png';
import logoSrcSmall2x from '../../assets/img/logo-green-small-2x.png';

const Footer = () => {
	return (
		<footer className='footer' id='footer'>
			<div className='footer__logo-box'>
				<picture className='footer__logo'>
					<source
						srcSet={`${logoSrcSmall1x} 1x, ${logoSrcSmall2x} 2x`}
						media='(max-width: 37.5em)'
					/>
					<img srcSet={`${logoSrc1x} 1x,${logoSrc2x} 2x`} alt='Full logo' />
				</picture>
			</div>

			<div className='row'>
				<div className='col-1-of-2'>
					<div className='footer__navigation'>
						<ul className='footer__list'>
							<li className='footer__item'>
								<a href='#' className='footer__link'>
									Company
								</a>
							</li>
							<li className='footer__item'>
								<a href='#' className='footer__link'>
									Contact us
								</a>
							</li>
							<li className='footer__item'>
								<a href='#' className='footer__link'>
									Careers
								</a>
							</li>
							<li className='footer__item'>
								<a href='#' className='footer__link'>
									Privacy policy
								</a>
							</li>
							<li className='footer__item'>
								<a href='#' className='footer__link'>
									Terms
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className='col-1-of-2'>
					<p className='footer__copyright'>
						Built by{' '}
						<a href='asd' className='footer__link'>
							Zelalem Mekonnen, 2022.
						</a>{' '}
						Copyright &copy; by Abyssinia Tour. Lorem ipsum dolor, sit amet
						consectetur adipisicing elit. Harum dicta odio sunt. Cumque hic
						porro, odio quis nisi, voluptates tempora ducimus vero fuga nihil
						necessitatibus omnis asperiores et accusantium saepe! Suscipit
						molestiae.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
