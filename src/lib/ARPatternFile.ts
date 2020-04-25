class ARPatternFile {
	static toCanvas(patternFileString: string, onComplete: (patternFileString: string) => void) {
		console.assert(false, 'not yet implemented')
	}

	static encodeImageURL(imageURL: string, onComplete: (patternFileString: string) => void) {
		const image = new Image();
		image.onload = () => {
			const patternFileString = this.encodeImage(image);
			onComplete(patternFileString);
		};
		image.src = imageURL;
	}

	static encodeImage(image: HTMLImageElement) {
		// copy image on canvas
		const canvas = document.createElement('canvas') as HTMLCanvasElement;
		const context = canvas.getContext('2d');
		canvas.width = 16;
		canvas.height = 16;
		// document.body.appendChild(canvas)
		// canvas.style.width = '200px'
		let patternFileString = '';
		for (let orientation = 0; orientation > -2 * Math.PI; orientation -= Math.PI / 2) {
			// draw on canvas - honor orientation
			context.save();
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.translate(canvas.width / 2, canvas.height / 2);
			context.rotate(orientation);
			context.drawImage(image, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
			context.restore();
			// get imageData
			const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
			// generate the patternFileString for this orientation
			if (orientation !== 0) {
				patternFileString += '\n';
			}
			// NOTE bgr order and not rgb!!! so from 2 to 0
			for (let channelOffset = 2; channelOffset >= 0; channelOffset--) {
				// console.log('channelOffset', channelOffset)
				for (let y = 0; y < imageData.height; y++) {
					for (let x = 0; x < imageData.width; x++) {
						if (x !== 0) {
							patternFileString += ' ';
						}
						const offset = (y * imageData.width * 4) + (x * 4) + channelOffset;
						const value = imageData.data[offset];
						patternFileString += String(value).padStart(3);
					}
					patternFileString += '\n';
				}
			}
		}
		return patternFileString;
	}

	static triggerDownload(patternFileString: string, fileName = 'pattern-marker.patt') {
		// tech from https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
		const domElement = window.document.createElement('a') as HTMLAnchorElement;
		domElement.href = window.URL.createObjectURL(new Blob([patternFileString], { type: 'text/plain' }));
		domElement.download = fileName;
		document.body.appendChild(domElement);
		domElement.click();
		document.body.removeChild(domElement);
	}

	static buildFullMarker(innerImageURL: string, pattRatio: number, size: number, color: string, onComplete: (patternFileString: string) => void) {
		const whiteMargin = 0.1;
		const blackMargin = (1 - 2 * whiteMargin) * ((1 - pattRatio) / 2);
		// var blackMargin = 0.2
		const innerMargin = whiteMargin + blackMargin;
		const canvas = document.createElement('canvas') as HTMLCanvasElement;
		const context = canvas.getContext('2d');
		canvas.width = size;
		canvas.height = size;
		context.fillStyle = 'white';
		context.fillRect(0, 0, canvas.width, canvas.height);
		// copy image on canvas
		context.fillStyle = color;
		context.fillRect(
			whiteMargin * canvas.width,
			whiteMargin * canvas.height,
			canvas.width * (1 - 2 * whiteMargin),
			canvas.height * (1 - 2 * whiteMargin),
		);
		// clear the area for innerImage (in case of transparent image)
		context.fillStyle = 'white';
		context.fillRect(
			innerMargin * canvas.width,
			innerMargin * canvas.height,
			canvas.width * (1 - 2 * innerMargin),
			canvas.height * (1 - 2 * innerMargin),
		);
		// display innerImage in the middle
		const innerImage = document.createElement('img') as HTMLImageElement;
		innerImage.addEventListener('load', () => {
			// draw innerImage
			context.drawImage(innerImage,
				innerMargin * canvas.width,
				innerMargin * canvas.height,
				canvas.width * (1 - 2 * innerMargin),
				canvas.height * (1 - 2 * innerMargin),
			);
			const imageUrl = canvas.toDataURL();
			onComplete(imageUrl);
		});
		innerImage.src = innerImageURL;
	}
}

export default ARPatternFile;
