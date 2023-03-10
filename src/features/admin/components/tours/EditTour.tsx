import './new.scss';
// import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { updateTour, type UpdateTourData } from '../../../tours/toursSlice';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';
import { FormField, SubmitButton } from '../../../../components/form';
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Switch,
	FormControlLabel,
	OutlinedInput,
} from '@mui/material';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import size from 'react-element-popper/animations/size';
import type { Location, TourModel } from '../../../../types/models';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import ImagePreview from './ImagePreview';
import { getAllUsers, fetchUsers } from '../users/usersSlice';
import Search from 'react-leaflet-search';
import { LatLng } from 'leaflet';
import { TileLayer, Popup, Marker, Map, Tooltip } from 'react-leaflet';
import MapPin from '../../../tours/MapPin';

const customPopup = (SearchInfo: any) => {
	return (
		<Popup>
			<div>
				<p>I am a custom popUp</p>
				<p>
					latitude and longitude from search component:{' '}
					{SearchInfo.latLng.toString().replace(',', ' , ')}
				</p>
				<p>Info from search component: {SearchInfo.info}</p>
				<p>
					{SearchInfo.raw &&
						SearchInfo.raw.place_id &&
						JSON.stringify(SearchInfo.raw.place_id)}
				</p>
			</div>
		</Popup>
	);
};

const validationSchema = Yup.object().shape({
	name: Yup.string().min(8).required('Name is required'),
	summary: Yup.string().min(15).required('Summary is required'),
	duration: Yup.number().min(1).required('Duration is required'),
	price: Yup.number().min(5).required('Price is required'),
	maxGroupSize: Yup.number().min(1).required('Max Group Size is required'),
	startDates: Yup.array().min(1).required('Start Date is required'),
});
type EditTourProps = {
	id: string;
};

const UpdateTour = ({ id }: EditTourProps) => {
	const tour = useAppSelector((state) =>
		state.tours.tours.find((tour) => tour._id === id)
	) as TourModel;

	const [locations, setLocations] = useState<any[]>([]);
	const users = useAppSelector(getAllUsers);

	const methods = useForm<TourModel>({
		defaultValues: {
			...tour,
		},
		resolver: yupResolver(validationSchema),
	});

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (users.length === 0) {
			dispatch(fetchUsers());
		}
	}, [dispatch, users.length]);

	const allGuides = users.filter(
		(user) =>
			user.role === 'guide' ||
			user.role === 'lead-guide' ||
			user.role === 'intern'
	);

	const [imageCover, setImageCover] = useState<File | null>(null);
	const [images, setImages] = useState<File[]>([]);

	const onSubmit = async (values: TourModel) => {
		const tourData = new FormData();

		Object.keys(values).forEach((key: any) => {
			if (key === 'images' && values['images']) {
				for (let i = 0; i < values['images'].length; i++) {
					tourData.append('images', values['images'][i] as any);
				}
			} else if (key === 'imageCover' && values['imageCover']) {
				tourData.append('imageCover', values[key] as any);
			} else if (
				key === 'startDates' &&
				values['startDates'] !== tour?.startDates
			) {
				const startDatesModified = values['startDates'].map((date: any) => {
					return new Date(date).getTime();
				});

				tourData.append(
					'startDates',
					JSON.stringify(startDatesModified) as any
				);
			} else if (
				key === 'startLocation' &&
				values['startLocation'] !== tour?.startLocation
			) {
				tourData.append(
					'startLocation',
					JSON.stringify(values['startLocation'])
				);
			} else if (key === 'guides' && values['guides'] !== tour?.guides) {
				tourData.append('guides', JSON.stringify(values['guides']));
			} else if (key === 'locations' && locations.length !== 0) {
				tourData.append(
					'locations',
					JSON.stringify([...(tour?.locations as Location[]), ...locations])
				);
			} else {
				if (values[key] !== tour[key]) tourData.append(key, values[key]);
			}
		});

		if (locations.length === 0) {
			tourData.delete('locations');
		}
		const updateTourValues = { id: tour?.id, _id: id, tourData };

		await dispatch(updateTour(updateTourValues as UpdateTourData));
		methods.reset();
	};

	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};

	return (
		<div className='edit-tour'>
			<div className='edit-tour__heading'>
				<h1>Edit {tour?.name} Tour</h1>
			</div>

			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit)}
					className='form edit-tour__form'
				>
					<div className='edit-tour__form-top'>
						<div className='form__group'>
							<FormControlLabel
								className='form__input'
								control={
									<Switch
										defaultChecked={methods.getValues('public')}
										{...methods.register('public')}
										color='secondary'
									/>
								}
								label='Public'
							/>
						</div>
						<div className='form__group'>
							<FormControlLabel
								className='form__input'
								control={<Switch color='secondary' />}
								label='Secret Tour'
							/>
						</div>

						<FormField
							label='Tour Name'
							type='text'
							placeholder='Tour Name'
							name='name'
						/>
						<FormField
							label='Summary'
							type='text'
							placeholder='Summary'
							name='summary'
						/>

						<FormField
							label='Description'
							type='text'
							placeholder='Description'
							name='description'
						/>

						<FormField
							label='Duration'
							type='number'
							placeholder='Duration'
							name='duration'
						/>

						<FormField
							label='Price'
							type='number'
							placeholder='Price'
							name='price'
						/>

						<FormField
							label='Max Group Size'
							type='number'
							placeholder='Max Group Size'
							name='maxGroupSize'
						/>

						<div className='form__group'>
							<Controller
								control={methods.control}
								name='startDates'
								render={({
									field: { onChange, value },
									fieldState: { invalid, isDirty }, //optional
									formState: { errors }, //optional, but necessary if you want to show an error message
								}) => (
									<>
										<DatePicker
											className='form__input'
											multiple
											animations={[size()]}
											plugins={[<DatePanel />]}
											style={{ padding: ' 20px' }}
											placeholder='Start Dates'
											value={value || ''}
											onChange={(date) => {
												onChange(date);
											}}
										/>
										{errors['startDates'] && (
											<ErrorMessage errors={errors} name='startDates' as='p' />
										)}
									</>
								)}
							/>
						</div>
						<div className='form__group'>
							<input
								className='form__input'
								type='text'
								placeholder='Start Location'
								id='startLocation'
								{...methods.register('startLocation')}
								value={tour?.startLocation?.description}
							/>
							<label htmlFor='startLocation' className='form__label'>
								Start Location
							</label>
						</div>

						<div className='form__group'>
							<input
								id='locations'
								type='text'
								placeholder='Locations'
								value={[...(tour?.locations as Location[]), ...locations]
									.map((loc) => loc.description)
									.join(', ')}
								className='form__input'
							/>
							<label htmlFor='locations' className='form__label'>
								Locations
							</label>
						</div>
						<div className='form__group'>
							<FormControl sx={{ m: 1, width: 300 }}>
								<InputLabel id='guides'>Guides</InputLabel>
								<Select
									labelId='guides'
									id='multiple-guides'
									multiple
									input={<OutlinedInput label='Guides' />}
									MenuProps={MenuProps}
									{...methods.register('guides')}
									defaultValue={tour?.guides || methods.getValues('guides')}
								>
									{allGuides?.map((guide) => (
										<MenuItem key={guide?._id} value={guide?._id}>
											{guide?.name + '->' + guide?.role}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
						<div className='formInput'>
							<FormControl fullWidth>
								<InputLabel id='difficulty'>Difficulty</InputLabel>
								<Select
									labelId='difficulty'
									id='difficulty'
									{...methods.register('difficulty')}
									defaultValue={
										methods.getValues('difficulty')
											? methods.getValues('difficulty')
											: 'easy'
									}
									label='Difficulty'
								>
									<MenuItem value='easy'>Easy</MenuItem>
									<MenuItem value='medium'>Medium</MenuItem>
									<MenuItem value='difficult'>Difficult </MenuItem>
								</Select>
							</FormControl>
						</div>
						<div className='formInput'>
							<label htmlFor='images'>
								Tour Images: <DriveFolderUploadOutlinedIcon className='icon' />
							</label>
							<input
								type='file'
								id='images'
								accept='image/*'
								multiple
								{...methods.register('images')}
								style={{ display: 'none' }}
								onChange={(e: any) => {
									setImages(e.target.files);
								}}
							/>
							{Object.keys(images).length > 0 && (
								<ImagePreview
									images={Object.keys(images).map((key) => {
										return {
											src: URL.createObjectURL(images[key] as Blob),
											alt: `${tour?.name}-${key}`,
										};
									})}
								/>
							)}
						</div>
						<div className='formInput'>
							<label htmlFor='imageCover'>
								Cover Image: <DriveFolderUploadOutlinedIcon className='icon' />
							</label>
							<input
								type='file'
								id='imageCover'
								accept='image/*'
								{...methods.register('imageCover')}
								style={{ display: 'none' }}
								onChange={(e: any) => {
									setImageCover(e.target.files[0]);
								}}
							/>
							{imageCover && (
								<ImagePreview
									images={[
										{
											src: URL.createObjectURL(imageCover as Blob),
											alt: tour?.name,
										},
									]}
								/>
							)}
						</div>
					</div>

					<div className='edit-tour__form__map-container'>
						<Map
							className='edit-tour__form__map-container-map'
							center={[
								tour?.startLocation?.coordinates[1] as number,
								tour?.startLocation?.coordinates[0] as number,
							]}
							zoom={9}
							scrollWheelZoom={false}
						>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
							/>
							<Marker
								position={[
									tour?.startLocation?.coordinates[1] as number,
									tour?.startLocation?.coordinates[0] as number,
								]}
								icon={MapPin}
								alt='Start Location'
							>
								<Tooltip className='mapboxgl-popup-content'>
									Start Location: {tour?.startLocation?.description}
								</Tooltip>
							</Marker>
							{[...(tour?.locations as Location[]), ...locations].map(
								(location: any) => {
									return (
										<Marker
											key={location.day}
											position={[
												location?.coordinates[1],
												location.coordinates[0],
											]}
											icon={MapPin}
										>
											<Tooltip className='mapboxgl-popup-content'>
												{`Day ${location.day}: ${location.description}`}
											</Tooltip>
										</Marker>
									);
								}
							)}
							<Search
								onChange={(info: { latLng: LatLng; info: any; raw: any }) => {
									setLocations((prev) => {
										return [
											...prev,
											{
												type: 'Point',
												coordinates: [info.latLng.lng, info.latLng.lat],
												description: info.info,
												address: info?.raw[0]?.display_name,
												day: prev.length + 1,
											},
										];
									});
								}}
								position='topleft'
								inputPlaceholder='Search Tour Locations'
								zoom={13}
								showMarker={true}
								showPopup={true}
								openSearchOnLoad={true} // By default there's a search icon which opens the input when clicked. Setting this to true opens the search by default.
								closeResultsOnClick={true} // By default, the search results remain when you click on one, and the map flies to the location of the result. But you might want to save space on your map by closing the results when one is clicked. The results are shown again (without another search) when focus is returned to the search input.
								provider={'OpenStreetMap'}
							>
								{(info: {
									latLng: LatLng;
									info: string | Array<string>;
									raw: Record<string, unknown>;
								}) => (
									<Marker icon={MapPin} position={info?.latLng}>
										{customPopup(info)}
									</Marker>
								)}
							</Search>
							<Search
								onChange={(info: { latLng: LatLng; info: any; raw: any }) => {
									setLocations((prev) => {
										return [
											...prev,
											{
												type: 'Point',
												coordinates: [info.latLng.lng, info.latLng.lat],
												description: info.info,
												address: info?.raw[0]?.display_name,
												day: prev.length + 1,
											},
										];
									});
								}}
								position='topleft'
								inputPlaceholder='Search Tour Start Location'
								zoom={7}
								showMarker={true}
								showPopup={true}
								openSearchOnLoad={true} // By default there's a search icon which opens the input when clicked. Setting this to true opens the search by default.
								closeResultsOnClick={true} // By default, the search results remain when you click on one, and the map flies to the location of the result. But you might want to save space on your map by closing the results when one is clicked. The results are shown again (without another search) when focus is returned to the search input.
								provider={'OpenStreetMap'}
							>
								{(info: {
									latLng: LatLng;
									info: string | Array<string>;
									raw: Record<string, unknown>;
								}) => (
									<Marker icon={MapPin} position={info?.latLng}>
										{customPopup(info)}
									</Marker>
								)}
							</Search>
						</Map>
					</div>
					<div className='edit-tour__form-submit'>
						<SubmitButton type='submit' title='Update Tour' />
					</div>
				</form>
			</FormProvider>
		</div>
	);
};

export default UpdateTour;
