import L from 'leaflet';

const MapPin = new L.Icon({
	iconUrl: require('../../../assets/img/pin.png'),
	// iconAnchor: null,
	// popupAnchor: null,
	// shadowUrl: null,
	// shadowSize: null,
	// shadowAnchor: null,
	// iconSize: new L.Point(60, 75),
	className: 'marker',
});

export default MapPin;
