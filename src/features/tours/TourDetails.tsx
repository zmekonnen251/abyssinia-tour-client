import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTour, selectTour } from './toursSlice';
import Header from '../../layouts/Header/Header';
import API from '../../services/httpService';
import { toast } from 'react-toastify';
import Reviews from '../reviews/Reviews';
import TourCallToAction from './TourCallToAction';
import TourMap from './TourMap';
import TourDetailsPictures from './TourDetailsPictures';
import TourDetailsDescription from './TourDetailsDescription';
import TourDetailsHeader from './TourDetailsHeader';
import { User } from '../../types/models';
import useAuth from '../../hooks/useAuth';

const TourDetails = () => {
	let { tourId } = useParams();
	const [checkoutLoading, setCheckoutLoading] = React.useState(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchTour(tourId as string));
	}, [tourId, dispatch]);

	const tour = useAppSelector(selectTour);
	const user = useAuth()

	const [searchParams] = useSearchParams();
	const tourToBooked = searchParams.get('tour');
	const userToBook = searchParams.get('user');
	const price = searchParams.get('price');

	useEffect(() => {
		if (tourToBooked && userToBook && price) {
			bookTour(userToBook, tourToBooked, price);
			const query = new URLSearchParams(window.location.search);

			if (query.get('success')) {
				toast.success('Order placed! You will receive an email confirmation.');

				setTimeout(() => {
					navigate('/profile/my-bookings');
				}, 2000);
			}

			if (query.get('canceled')) {
				toast.error(
					"Order canceled -- continue to shop around and checkout when you're ready."
				);
			}
		}
	}, [tourToBooked, userToBook, price, tourId, navigate]);

	const handleBookTour = async () => {
		setCheckoutLoading(true);
		if (!user?.isLoggedIn) {
			navigate('/login');
		}

		try {
			const { data } = await API.post(`/bookings/checkout-session/${tourId}`);
			setCheckoutLoading(false);
			if (data.status === 'success') {
				window.location.replace(data.session.url);
			}
		} catch (err) {
			console.log(err);
			setCheckoutLoading(false);
		}
	};

	const bookTour = async (user, tour, price) => {
		try {
			await API.get<any>(
				`/bookings/create-booking/user/${user}/tour/${tour}/price/${price}`
			);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Header />

			{tour && (
				<>
					<TourDetailsHeader tour={tour} />
					<TourDetailsDescription tour={tour} />
					<TourDetailsPictures images={tour?.images} />

					<TourMap
						locations={tour?.locations ? tour?.locations : []}
						startLocation={
							tour?.startLocation ? tour?.startLocation : ({} as any)
						}
					/>

					<Reviews
						tourId={tour?._id}
						reviews={tour?.reviews ? tour?.reviews : []}
					/>

					<TourCallToAction
						tour={tour}
						checkoutLoading={checkoutLoading}
						onClick={handleBookTour}
					/>
				</>
			)}
		</>
	);
};

export default TourDetails;
