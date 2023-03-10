export type TourModel = {
	_id: string;
	id: string;
	name: string;
	duration: number;
	durationWeeks: number | null;
	maxGroupSize: number;
	difficulty: 'easy' | 'medium' | 'difficult';
	price: number;
	guides: string[] | [];
	imageCover: string | null;
	images: string[] | [];
	summary: string;
	description: string | null;
	ratingsAverage: number | null;
	ratingsQuantity: number | null;
	startDates: string[];
	slug: string | null;
	locations: Location[] | null;
	reviews: ReviewModel[] | null;
	startLocation: {
		address: string;
		coordinates: number[];
		description: string;
		type: string;
	} | null;
	secretTour: boolean | null;

	createdAt: string;
	public: boolean;
};

// export type TourUpdateModel ={
// 	_id: string;
// 	id?: string;
// 	name?: string | null;
// 	duration?: number | null;
// 	durationWeeks?: number | null;
// 	maxGroupSize?: number;
// 	difficulty?: string;
// 	price?: number;
// 	guides?: Guide[];
// 	imageCover?: string;
// 	images?: string[];
// 	summary?: string;
// 	description?: string;
// 	ratingsAverage?: number;
// 	ratingsQuantity?: number;
// 	startDates?: Date[];
// 	slug?: string;
// 	locations?: Location[];
// 	startLocation?: {
// 		address: string;
// 		coordinates: number[];
// 		description: string;
// 		type: string;
// 	};
// 	secretTour?: boolean;
// 	createdAt?: string;
// };

export type User = {
	name: string;
	email: string;
	photo?: string;
	active: boolean;
	role: 'admin' | 'user' | 'guide' | 'lead-guide' | 'intern';
	_id: string;
	id?: string;
	createdAt: Date;
};

export type Location = {
	type: string;
	coordinates: number[];
	address: string;
	description: string;
	day: number;
	notes: string | null;
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

export type BookingModel = {
	_id: string;
	tour: TourModel;
	user: User;
	price: number;
	createdAt: string;
	paid: boolean;
};
