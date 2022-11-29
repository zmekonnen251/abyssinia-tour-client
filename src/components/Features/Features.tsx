import React from 'react';
import Feature from './Feature/Feature';
import { FeatureData } from '../../types';

type FeaturesProps = {
	features: FeatureData[];
};

const Features = ({ features }: FeaturesProps) => {
	return (
		<section className='section-features' id='features'>
			<div className='row'>
				{features.map((feature) => (
					<Feature
						key={feature.id}
						heading={feature.heading}
						text={feature.text}
						icon={feature.icon}
					/>
				))}
			</div>
		</section>
	);
};

export default Features;
