import { IComponentDescriptor } from '../../../../models/component';

const daydreamControls: IComponentDescriptor = {
	isSingleProp: false,
	schema: {
		armModel: {
			type: 'boolean',
			default: true,
		},
		buttonColor: {
			type: 'color',
			default: '#000000',
		},
		buttonHighlightColor: {
			type: 'color',
			default: '#ffffff',
		},
		buttonTouchedColor: {
			type: 'color',
			default: '#777777',
		},
		hand: {
			type: 'string',
			oneOf: ['left', 'right'],
		},
		model: {
			type: 'boolean',
			default: true,
		},
		orientationOffset: {
			type: 'vec3',
			default: {
				x: 0,
				y: 0,
				z: 0,
			},
		},
	},
};

export default daydreamControls;
