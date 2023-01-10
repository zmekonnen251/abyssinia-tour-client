import React from 'react';
import { useParams } from 'react-router-dom';

const Success = () => {
	const { tourSlug } = useParams();

	const tourName = tourSlug?.split('-').join(' ');

	return <div>Thank you for booking {tourName} Tour!</div>;
};

export default Success;
