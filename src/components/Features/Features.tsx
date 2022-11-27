import React from 'react';
import Feature from './Feature/Feature';
import styles from './Features.module.scss';
import { FeatureData } from '../../types';

type FeaturesProps = {
	features: FeatureData[];
};

const Features = ({ features }: FeaturesProps) => {
	return (
		<section className={styles.sectionFeatures} id='features'>
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
