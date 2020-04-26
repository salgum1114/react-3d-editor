import { IComponentDescriptor } from '../../../../models/component';

const position: IComponentDescriptor = {
	isSingleProp: true,
	name: 'position',
	schema: {
		type: 'vec3',
		default: {
			x: 0,
			y: 0,
			z: 0,
		},
	},
};

export default position;
