export type FeatureData = {
	id: number;
	heading: string;
	text: string;
	icon: string;
};

export type TourData = {
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

type Color = {
	light: string;
	dark: string;
};
