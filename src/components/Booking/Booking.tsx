import React from 'react';

const Booking = () => {
	return (
		<section className='section-book' id='book'>
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

							<div className='form__group u_margin_bottom_medium'>
								<div className='form__radio-group'>
									<input
										type='radio'
										className='form__radio-input'
										id='small'
										name='size'
									/>
									<label htmlFor='small' className='form__radio-label'>
										<span className='form__radio-button'></span>
										Small tour group
									</label>
								</div>
								<div className='form__radio-group'>
									<input
										type='radio'
										className='form__radio-input'
										id='large'
										name='size'
									/>
									<label htmlFor='large' className='form__radio-label'>
										<span className='form__radio-button'></span>
										Large tour group
									</label>
								</div>
							</div>
							<div className='form__group'>
								<button className='btn btn--green'>Next step &#10132;</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Booking;
