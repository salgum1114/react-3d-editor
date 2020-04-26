import { IComponentDescriptor } from '../../../../models/component';

const keyboardShortcuts: IComponentDescriptor = {
	isSingleProp: false,
	schema: {
		enterVR: {
			type: 'boolean',
			default: true,
		},
		exitVR: {
			type: 'boolean',
			default: true,
		},
	},
};

export default keyboardShortcuts;
