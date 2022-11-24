import React from 'react';
import Header from '../layouts/header/Header';
import About from '../components/About/About';
import Features from '../components/Features/Features';
import Tours from '../components/Tours/Tours';
import Booking from '../components/Booking/Booking';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import { FeatureData, TourData } from '../../src/types';
import tour1Img from '../assets/img/nat-5.jpg';
import tour2Img from '../assets/img/nat-6.jpg';
import tour3Img from '../assets/img/nat-7.jpg';

import './Home.scss';
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
		guides: ['John', 'Jane'],
		maxGroupSize: 30,
		difficulty: 'easy',
		imgCover: tour1Img,
		color: { light: '#ffb900', dark: '#ff7730' },
	},
	{
		id: 2,
		name: 'The Forest Hiker',
		price: 497,
		duration: 7,
		summary: 'Sleep in provided tents.',
		guides: ['John', 'Jane', 'Jack'],
		maxGroupSize: 15,
		difficulty: 'medium',
		imgCover: tour2Img,
		color: { light: '#7ed56f', dark: '#28b485' },
	},
	{
		id: 3,
		name: 'The Snow Adventurer',
		price: 897,
		duration: 5,
		summary: 'Sleep in provided tents.',
		guides: ['John', 'Jane', 'Jack', 'Jill'],
		maxGroupSize: 25,
		difficulty: 'hard',
		imgCover: tour3Img,
		color: { light: '#2998ff', dark: '#5643fa' },
	},
];

const Home = () => {
	return (
		<>
			<Navbar />
			<Header />
			<main>
				<About />
				<Features features={features} />
				<Tours tours={tours} />
				<Stories />
				<Booking />
			</main>
			<Footer />
		</>
	);
};

export default Home;
