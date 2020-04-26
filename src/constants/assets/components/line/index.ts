import { IComponentDescriptor } from '../../../../models/component';

const line: IComponentDescriptor = {
	isSingleProp: false,
	multiple: true,
	schema: {
		start: {
			type: 'vec3',
			default: {
				x: 0,
				y: 0,
				z: 0,
			},
		},
		end: {
			type: 'vec3',
			default: {
				x: 0,
				y: 0,
				z: 0,
			},
		},
		color: {
			type: 'color',
			default: '#74BEC1',
		},
		opacity: {
			type: 'number',
			default: 1,
		},
		visible: {
			type: 'boolean',
			default: true,
		},
	},
};

export default line;
