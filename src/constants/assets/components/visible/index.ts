import { IComponentDescriptor } from '../../../../models/component';

const visible: IComponentDescriptor = {
	isSingleProp: true,
	schema: {
		type: 'boolean',
		default: true,
	},
	name: 'visible',
};

export default visible;
