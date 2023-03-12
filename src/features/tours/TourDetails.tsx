import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTour, selectTour } from './toursSlice';
import Header from '../../layouts/Header/Header';
import API from '../../services/httpService';
import Reviews from '../reviews/Reviews';
import TourCallToAction from './TourCallToAction';
import TourMap from './TourMap';
import TourDetailsPictures from './TourDetailsPictures';
import TourDetailsDescription from './TourDetailsDescription';
import TourDetailsHeader from './TourDetailsHeader';
// import { User } from '../../types/models';
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
	const user = useAuth();

	const handleBookTour = async () => {
		setCheckoutLoading(true);
		if (!user?.isLoggedIn) {
			navigate('/login');
		}

		try {
			const { data } = await API.post(
				`/bookings/chapa-checkout-session/${tourId}`
			);
			console.log(data);
			setCheckoutLoading(false);
			if (data.status === 'success') {
				window.location.replace(data.checkout_url);
			}
		} catch (err) {
			console.log(err);
			setCheckoutLoading(false);
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
