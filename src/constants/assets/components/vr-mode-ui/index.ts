import { IComponentDescriptor } from '../../../../models/component';

const vrModeUi: IComponentDescriptor = {
	isSingleProp: false,
	dependencies: ['canvas'],
	schema: {
		enabled: {
			type: 'boolean',
			default: true,
		},
		enterVRButton: {
			type: 'selector',
		},
	},
};

export default vrModeUi;
