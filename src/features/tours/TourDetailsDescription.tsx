import {
	faArrowTrendUp,
	faCalendar,
	faStar,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type TourModel } from '../../types/models';

type TourDetailsDescriptionProps = {
	tour: TourModel;
};
const TourDetailsDescription = ({ tour }: TourDetailsDescriptionProps) => {
	return (
		<section className='section-description'>
			<div className='overview-box'>
				<div>
					<div className='overview-box__group'>
						<h2 className='heading-secondary-tour-details u_margin_bottom_big'>
							Quick facts
						</h2>
						<div className='overview-box__detail'>
							<FontAwesomeIcon
								icon={faCalendar}
								className='overview-box__icon'
							/>

							<span className='overview-box__label'>Next date</span>
							<span className='overview-box__text'>August 2021</span>
						</div>
						<div className='overview-box__detail'>
							<FontAwesomeIcon
								icon={faArrowTrendUp}
								className='overview-box__icon'
							/>

							<span className='overview-box__label'>Difficulty</span>
							<span className='overview-box__text'>{tour?.difficulty}</span>
						</div>
						<div className='overview-box__detail'>
							<FontAwesomeIcon icon={faUser} className='overview-box__icon' />
							<span className='overview-box__label'>Participants</span>
							<span className='overview-box__text'>
								{tour?.maxGroupSize} people
							</span>
						</div>
						<div className='overview-box__detail'>
							<FontAwesomeIcon
								icon={faStar}
								className='reviews__star reviews__star--active'
							/>
							<span className='overview-box__label'>Rating</span>
							<span className='overview-box__text'>
								{tour?.ratingsAverage} / 5
							</span>
						</div>
					</div>
					<div className='overview-box__group'>
						<h2 className='heading-secondary-tour-details u_margin_bottom_big'>
							Your tour guides
						</h2>
						{tour?.guides?.map(
							(guide) =>
								guide && (
									<div className='overview-box__detail' key={guide._id}>
										<img
											className='overview-box__img'
											src={`${process.env.REACT_APP_PUBLIC_URL}/img/users/${guide.photo}`}
											alt='Tour guide'
										/>
										<span className='overview-box__label'>
											{guide.role === 'lead-guide' && 'Your Lead Guide'}{' '}
											{guide.role === 'guide' && 'Tour Guide'}{' '}
											{guide.role === 'intern' && 'Intern'}
										</span>
										<span className='overview-box__text'>{guide.name}</span>
									</div>
								)
						)}
					</div>
				</div>
			</div>
			<div className='description-box'>
				<h2 className='heading-secondary-tour-details u_margin_bottom_big'>
					About the park camper tour
				</h2>
				<p className='description__text'>{tour?.description}</p>
				<p className='description__text'>{tour?.description}</p>
			</div>
		</section>
	);
};

export default TourDetailsDescription;
