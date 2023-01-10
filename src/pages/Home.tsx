import React, { useEffect } from 'react';
import Hero from '../layouts/Hero/Hero';
import About from '../components/About/About';
import Features from '../components/Features/Features';
import FeaturedTours from '../components/FeaturedTours/FeaturedTours';
import Booking from '../components/Booking/Booking';
import Footer from '../layouts/Footer/Footer';
import Navbar from '../layouts/Navbar/Navbar';
import { FeatureData, TourData } from '../../src/types';
import { useAppDispatch } from '../store/hooks';
import { fetchTours } from '../features/tours/components/toursSlice';
import tour1Img from '../assets/img/nat-5.jpg';
import tour2Img from '../assets/img/nat-6.jpg';
import tour3Img from '../assets/img/nat-7.jpg';
import tour4Img from '../assets/img/nat-8.jpg';
import tour5Img from '../assets/img/nat-9.jpg';
import tour6Img from '../assets/img/nat-10.jpg';
import tour7Img from '../assets/img/nat-1.jpg';
// import tour8Img from '../assets/img/nat-2.jpg';

import Stories from '../components/Stories/Stories';

const features: FeatureData[] = [
	{
		id: 1,
		heading: 'Explore the world',
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea quo delectus.',
		icon: 'icon-basic-world',
	},
	{
		id: 2,
		heading: 'Meet Nature',
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea quo delectus.',
		icon: 'icon-basic-compass',
	},
	{
		id: 3,
		heading: 'Find your way',
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea quo delectus.',
		icon: 'icon-basic-map',
	},
	{
		id: 4,
		heading: 'Live healthier life',
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea quo delectus.',
		icon: 'icon-basic-heart',
	},
];

const tours: TourData[] = [
	{
		id: 1,
		name: 'The Sea Explorer',
		price: 297,
		duration: 3,
		summary: 'Sleep in cozy hotels.',
		description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi atque hic ea soluta tempora unde minus consectetur omnis optio ex ad recusandae perspiciatis aliquam earum ipsum numquam, maiores assumenda corrupti.
		Vitae ipsum reprehenderit enim fugiat vel numquam maxime, at aut rem illo similique laborum earum provident officiis reiciendis, quae voluptatibus nesciunt animi eveniet eligendi unde. Nostrum hic veritatis odit eligendi.`,
		guides: ['John', 'Jane'],
		maxGroupSize: 30,
		difficulty: 'easy',
		imgCover: tour1Img,
		imgs: [tour1Img, tour2Img],
		color: { light: '#ffb900', dark: '#ff7730' },
	},
	{
		id: 2,
		name: 'The Forest Hiker',
		price: 497,
		duration: 7,
		summary: 'Sleep in provided tents.',
		description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi atque hic ea soluta tempora unde minus consectetur omnis optio ex ad recusandae perspiciatis aliquam earum ipsum numquam, maiores assumenda corrupti.
		Vitae ipsum reprehenderit enim fugiat vel numquam maxime, at aut rem illo similique laborum earum provident officiis reiciendis, quae voluptatibus nesciunt animi eveniet eligendi unde. Nostrum hic veritatis odit eligendi.`,
		guides: ['John', 'Jane', 'Jack'],
		maxGroupSize: 15,
		difficulty: 'medium',
		imgCover: tour2Img,
		imgs: [tour4Img, tour5Img],
		color: { light: '#7ed56f', dark: '#28b485' },
	},
	{
		id: 3,
		name: 'The Snow Adventurer',
		price: 897,
		duration: 5,
		summary: 'Sleep in provided tents.',
		description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi atque hic ea soluta tempora unde minus consectetur omnis optio ex ad recusandae perspiciatis aliquam earum ipsum numquam, maiores assumenda corrupti.
		Vitae ipsum reprehenderit enim fugiat vel numquam maxime, at aut rem illo similique laborum earum provident officiis reiciendis, quae voluptatibus nesciunt animi eveniet eligendi unde. Nostrum hic veritatis odit eligendi.`,
		guides: ['John', 'Jane', 'Jack', 'Jill'],
		maxGroupSize: 25,
		difficulty: 'hard',
		imgCover: tour3Img,
		imgs: [tour6Img, tour7Img],
		color: { light: '#2998ff', dark: '#5643fa' },
	},
];

const Home = () => {
	

	return (
		<>
			<Navbar />
			<Hero />
			<main>
				<About />
				<Features features={features} />
				<FeaturedTours tours={tours} />
				<Stories />
				<Booking />
			</main>
			<Footer />
		</>
	);
};

export default Home;
