import AssetItem from './a-asset-item';
import Audio from './audio';
import Image from './img';
import Video from './video';

export { default as AssetComponents } from './components';

export const ControlsHand = ['left', 'right'];

export const TextAlign = ['left', 'right', 'center'];

export const TextAnchor = ['left', 'right', 'center', 'align'];

export const TextBaseline = ['top', 'center', 'bottom'];

export const TextFont = [
	'roboto',
	'aileronsemibold',
	'dejavu',
	'exo2bold',
	'exo2semibold',
	'kelsonsans',
	'monoid',
	'mozillavr',
	'sourcecodeprop',
];

export const Side = ['front', 'back', 'double'];

export const TextWhiteSpace = ['normal', 'pre', 'nowrap'];

export const Shader = ['flat', 'ios10hls', 'msdf', 'portal', 'sdf', 'standard'];

export const SoundDistanceModel = ['linear', 'inverse', 'exponential'];

export const RaycasterObjects = ['distance', 'point', 'face', 'faceIndex', 'indices', 'object', 'uv'];

export const MaterialBlending = ['none', 'normal', 'additive', 'subtractive', 'multiply'];

export const MaterialVertexColors = ['none', 'face', 'vertex'];

export const AssetSchema: Record<any, any> = {
	'a-asset-item': AssetItem,
	audio: Audio,
	img: Image,
	video: Video,
};
