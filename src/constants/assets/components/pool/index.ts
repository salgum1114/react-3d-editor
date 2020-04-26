import { IComponentDescriptor } from '../../../../models/component';

const pool: IComponentDescriptor = {
	isSingleProp: false,
	multiple: true,
	schema: {
		container: {
			type: 'string',
		},
		dynamic: {
			type: 'boolean',
			default: false,
		},
		mixin: {
			type: 'string',
		},
		size: {
			type: 'number',
			default: 0,
		},
	},
};

export default pool;
