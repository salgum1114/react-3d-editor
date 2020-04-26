import { IComponentDescriptor } from '../../../../models/component';

const camera: IComponentDescriptor = {
	isSingleProp: false,
	schema: {
		active: {
			type: 'boolean',
			default: true,
		},
		far: {
			type: 'number',
			default: 10000,
		},
		fov: {
			type: 'number',
			default: 80,
			min: 0,
		},
		near: {
			type: 'number',
			default: 0.0005,
			min: 0,
		},
		spectator: {
			type: 'boolean',
			default: false,
		},
		zoom: {
			type: 'number',
			default: 1,
			min: 0,
		},
	},
};

export default camera;
