import React from 'react';
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { type Location } from '../../types/models';
import MapPin from './MapPin';

type TourMapProps = {
	locations: Location[];
	startLocation: Location;
};

const TourMap = ({ locations, startLocation }: TourMapProps) => {
	return (
		<section className='section-map'>
			{startLocation && locations && (
				<Map
					className='map'
					center={[
						startLocation?.coordinates[1] as number,
						startLocation?.coordinates[0] as number,
					]}
					zoom={8}
					scrollWheelZoom={false}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
					<Marker
						position={[
							startLocation?.coordinates[1] as number,
							startLocation?.coordinates[0] as number,
						]}
						icon={MapPin}
						alt='Start Location'
					>
						<Tooltip className='mapboxgl-popup-content'>
							Start Location: {startLocation?.description}
						</Tooltip>
					</Marker>
					{locations?.map((location: Location) => {
						return (
							<Marker
								key={location.day}
								position={[location.coordinates[1], location.coordinates[0]]}
								icon={MapPin}
							>
								<Tooltip className='mapboxgl-popup-content'>
									{`Day ${location.day}: ${location.description}`}
								</Tooltip>
							</Marker>
						);
					})}
				</Map>
			)}
		</section>
	);
};

export default TourMap;
