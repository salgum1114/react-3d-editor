import { IComponentDescriptor } from '../../../../models/component';

const rotation: IComponentDescriptor = {
	isSingleProp: true,
	name: 'rotation',
	schema: {
		type: 'vec3',
		default: {
			x: 0,
			y: 0,
			z: 0,
		},
	},
};

export default rotation;
