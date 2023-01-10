export type Guide = {
	email: string;
	name: string;
	photo: string;
	role: 'admin' | 'user' | 'guide' | 'lead-guide' | 'intern';
	_id: string;
};

export type TourModel = {
	id: string;
	name: string;
	duration: number;
	durationWeeks: number;
	maxGroupSize: number;
	difficulty: string;
	price: number;
	guides: Guide[];
	imageCover: string;
	images: string[];
	summary: string;
	description: string;
	ratingsAverage: number;
	ratingsQuantity: number;
	startDates: string[];
	slug: string;
	locations: Location[];
	startLocation: {
		address: string;
		coordinates: number[];
		description: string;
		type: string;
	};
};

export type User = {
	name: string;
	email: string;
	photo?: string;
	role?: 'admin' | 'user' | 'guide' | 'lead-guide';
	_id?: string;
};

export type Location = {
	coordinates: number[];
	address: string;
	description: string;
	day: number;
	notes: string;
};

// export type Post = {
// 	userId: number;
// 	id: number;
// 	title: string;
// 	body: string;
// };

export type FeatureData = {
	id: number;
	heading: string;
	text: string;
	icon: string;
};

type Color = {
	light: string;
	dark: string;
};

export type FeaturedTourData = {
	id: number;
	name: string;
	duration: number;
	maxGroupSize: number;
	difficulty: string;
	price: number;
	guides: string[];
	imgCover: string;
	imgs: string[];
	summary: string;
	description: string;
	color: Color;
};

export type ReviewModel = {
	_id: string;
	rating: number;
	review: string;
	createdAt: string;
	user: User;
};
