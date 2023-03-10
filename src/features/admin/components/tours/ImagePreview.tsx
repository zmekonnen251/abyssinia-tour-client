import React from 'react';
import './ImagePreview.scss';

type ImageData = {
	src: string;
	alt: string;
};

type ImagePreviewProps = {
	images: ImageData[];
};

function ImagePreview({ images }: ImagePreviewProps) {
	return (
		<div className='input-images-preview-container'>
			{images.map((image, index) => (
				<img
					src={image.src}
					alt={image.alt}
					key={index}
					className='input-image-preview'
				/>
			))}
		</div>
	);
}

export default ImagePreview;
