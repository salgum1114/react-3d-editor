import { IComponentDescriptor } from '../../../../models/component';

const handControls: IComponentDescriptor = {
	isSingleProp: true,
	schema: {
		type: 'string',
		oneOf: ['left', 'right'],
		default: 'left',
	},
};

export default handControls;
