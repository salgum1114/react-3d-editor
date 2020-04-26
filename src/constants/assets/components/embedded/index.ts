import { IComponentDescriptor } from '../../../../models/component';

const embedded: IComponentDescriptor = {
	isSingleProp: true,
	schema: {
		type: 'boolean',
		default: true,
	},
};

export default embedded;
