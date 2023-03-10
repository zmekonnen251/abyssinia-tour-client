import { ChevronLeft, ChevronRight } from '@mui/icons-material';

function CardSlider({ children }: { children: any }) {
	const slideLeft = () => {
		const slider = document.getElementById('slider');
		if (slider !== null) {
			slider.scrollLeft = slider?.scrollLeft + 500;
		}
	};

	const slideRight = () => {
		var slider = document.getElementById('slider');
		if (slider !== null) {
			slider.scrollLeft = slider?.scrollLeft - 500;
		}
	};

	return (
		<div className='review-slider-container'>
			<ChevronLeft
				className='slider-icon left'
				sx={{ fontSize: '3rem' }}
				onClick={slideLeft}
			/>

			<div className='reviews' id='slider'>
				{children}
			</div>

			<ChevronRight
				sx={{ fontSize: '3rem' }}
				className='slider-icon right'
				onClick={slideRight}
			/>
		</div>
	);
}

export default CardSlider;
