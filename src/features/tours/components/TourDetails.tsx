import React, { useEffect } from 'react';
import {
	Navigate,
	useLocation,
	useNavigate,
	useParams,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectAllTours } from './toursSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowTrendUp,
	faCalendar,
	faClock,
	faMap,
	faStar,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import Header from '../../../layouts/Header/Header';
import { fetchTourReviews, selectAllReviews } from './reviewsSlice';
import ReviewCard from './ReviewCard';
import { Guide } from '../../../types/models';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { Location } from '../../../types/models';
import API from '../../../services/httpService';
import { fetchTours } from './toursSlice';

// import { DivIcon } from 'leaflet';
import MapPin from './MapPin';
import { currentUser } from '../../authentication/components/authSlice';

const TourDetails = () => {
	const { slug } = useParams<{ slug: string }>();
	// let tourId: string;
	// const location = useLocation();
	// if (location.state.slug === slug) {
	// 	tourId = location.state.id;
	// }
	// tourId = location.state.slug === slug ? location.state.id : '';

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const allTours = useAppSelector(selectAllTours);
	useEffect(() => {
		dispatch(fetchTours());
	}, [dispatch, allTours.length]);

	const allReviews = useAppSelector(selectAllReviews);
	const user = useAppSelector(currentUser);
	const tour = allTours.find((tour) => tour.slug === slug);
	const tourId = tour?.id as string;

	useEffect(() => {
		dispatch(fetchTourReviews(tourId));
	}, [dispatch, tourId]);

	const handleBookTour = async () => {
		if (!user) {
			navigate('/login');
		}

		const { data } = await API.post(`/booking/checkout-session/${tourId}`);
		if (data.status === 'success') {
			window.location.replace(data.session.url);
		}
	};

	return (
		<>
			<Header />
			<section className='section-header'>
				<div className='header__hero'>
					<div className='header__hero-overlay'>&nbsp;</div>
					<img
						className='header__hero-img'
						src={`http://localhost:5000/img/tours/${tour?.imageCover}`}
						alt='Tour 5'
					/>
				</div>
				<div className='heading-box'>
					<h1 className='heading-primary-tour-details'>
						<span>{tour?.name}</span>
					</h1>
					<div className='heading-box__group'>
						<div className='heading-box__detail'>
							<FontAwesomeIcon icon={faClock} className='heading-box__icon' />

							<span className='heading-box__text'>{tour?.duration} days</span>
						</div>
						<div className='heading-box__detail'>
							<FontAwesomeIcon icon={faMap} className='heading-box__icon' />

							<span className='heading-box__text'>
								{tour?.startLocation.description}
							</span>
						</div>
					</div>
				</div>
			</section>
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
							{tour?.guides.map((guide: Guide) => {
								return (
									<div className='overview-box__detail'>
										<img
											className='overview-box__img'
											src={`http://localhost:5000/img/users/${guide.photo}`}
											alt='Tour guide'
										/>
										<span className='overview-box__label'>
											{guide.role === 'lead-guide' && 'Your Lead Guide'}{' '}
											{guide.role === 'guide' && 'Tour Guide'}{' '}
											{guide.role === 'intern' && 'Intern'}
										</span>
										<span className='overview-box__text'>{guide.name}</span>
									</div>
								);
							})}
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
			<section className='section-pictures'>
				<div className='picture-box'>
					<img
						className='picture-box__img picture-box__img--1'
						src={`http://localhost:5000/img/tours/${tour?.images[0]}`}
						alt='The Park Camper Tour 1'
					/>
				</div>
				<div className='picture-box'>
					<img
						className='picture-box__img picture-box__img--2'
						src={`http://localhost:5000/img/tours/${tour?.images[1]}`}
						alt='The Park Camper Tour 1'
					/>
				</div>
				<div className='picture-box'>
					<img
						className='picture-box__img picture-box__img--3'
						src={`http://localhost:5000/img/tours/${tour?.images[2]}`}
						alt='The Park Camper Tour 1'
					/>
				</div>
			</section>
			<section className='section-map'>
				<MapContainer
					className='map'
					center={[
						tour?.startLocation.coordinates[1] as number,
						tour?.startLocation.coordinates[0] as number,
					]}
					zoom={tour?.name === 'The City Wanderer' ? 4 : 7}
					scrollWheelZoom={false}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
					<Marker
						position={[
							tour?.startLocation.coordinates[1] as number,
							tour?.startLocation.coordinates[0] as number,
						]}
						icon={MapPin}
						alt='Start Location'
					>
						<Tooltip className='mapboxgl-popup-content'>
							Start Location: {tour?.startLocation.description}
						</Tooltip>
					</Marker>
					{tour?.locations.map((location: Location) => {
						return (
							<Marker
								key={location.day}
								position={[location.coordinates[1], location.coordinates[0]]}
								icon={MapPin}
							>
								<Tooltip className='mapboxgl-popup-content'>
									{`Day ${location.day}: ${location.description}`}
								</Tooltip>
								<Popup></Popup>
							</Marker>
						);
					})}
				</MapContainer>
			</section>
			<section className='section-reviews'>
				<div className='reviews'>
					{allReviews?.map((review) => (
						<ReviewCard key={review._id} review={review} />
					))}
				</div>
			</section>
			<section className='section-cta'>
				<div className='cta'>
					<div className='cta__img cta__img--logo'>
						<img
							src={`http://localhost:5000/img/logo-white.png`}
							alt='Natours logo'
						/>
					</div>
					<img
						className='cta__img cta__img--1'
						src={`http://localhost:5000/img/tours/${tour?.images[0]}`}
						alt=''
					/>
					<img
						className='cta__img cta__img--2'
						src={`http://localhost:5000/img/tours/${tour?.images[1]}`}
						alt=''
					/>
					<div className='cta__content'>
						<h2 className='heading-secondary-tour-details'>
							What are you waiting for?
						</h2>
						<p className='cta__text'>
							{tour?.duration} days. {tour?.summary}
						</p>
						<button
							className='btn btn--green span-all-rows'
							onClick={handleBookTour}
						>
							Book tour now!
						</button>
					</div>
				</div>
			</section>
		</>
	);
};

export default TourDetails;

// {
// 	tour &&
// 		tour?.images?.length > 0 &&
// 		tour?.images?.map((image: string, index: number) => {
// 			return (
// 				<div className='picture-box' key={index}>
// 					<img
// 						className='picture-box__img picture-box__img--1'
// 						src={`http://localhost:5000/img/tours/${image}`}
// 						alt='The Park Camper Tour 1'
// 					/>
// 				</div>
// 			);
// 		});
// }
