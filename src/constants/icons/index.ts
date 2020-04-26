import { AllType } from '../../models/primitive';

export const getIcon = (type: AllType) => {
	switch (type) {
		case 'a-camera':
			return 'camera';
		case 'a-curvedimage':
			return 'image';
		case 'a-gltf-model':
			return 'image';
		case 'a-image':
			return 'image';
		case 'a-link':
			return 'link';
		case 'a-plane':
			return 'rectangle';
		case 'a-ring':
			return 'circle-o';
		case 'a-sky':
			return 'skyatlas';
		case 'a-sound':
			return 'soundcloud';
		case 'a-text':
			return 'font';
		case 'a-triangle':
			return 'triangle';
		case 'a-video':
			return 'video-camera';
		case 'a-videosphere':
			return 'video-camera';
		case 'a-mixin':
			return 'connectdevelop';
		case 'img':
			return 'image';
		case 'video':
			return 'video-camera';
		case 'audio':
			return 'soundcloud';
		default:
			return 'cube';
	}
};
