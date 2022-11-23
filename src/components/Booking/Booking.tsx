import React from 'react';
import './Booking.scss';

const Booking = () => {
	return (
		<section className='section-book'>
			<div className='row'>
				<div className='book'>
					<div className='book__form'>
						<form className='form'>
							<div className='u_margin_bottom_medium'>
								<h2 className='heading-secondary'>Start booking now</h2>
							</div>
							<div className='form__group'>
								<input
									type='text'
									className='form__input'
									placeholder='Full name'
									id='name'
									required
								/>
								<label htmlFor='name' className='form__label'>
									Full name
								</label>
							</div>
							<div className='form__group'>
								<input
									type='email'
									className='form__input'
									placeholder='Email address'
									id='email'
									required
								/>
								<label htmlFor='email' className='form__label'>
									Email address
								</label>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Booking;
