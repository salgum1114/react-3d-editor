import { IComponentDescriptor } from '../../../../models/component';

const background: IComponentDescriptor = {
	isSingleProp: false,
	schema: {
		color: {
			type: 'color',
			default: 'black',
		},
		transparent: {
			type: 'boolean',
			default: false,
		},
	},
};

export default background;
