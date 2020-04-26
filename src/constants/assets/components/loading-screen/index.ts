import { IComponentDescriptor } from '../../../../models/component';

const loadingScreen: IComponentDescriptor = {
	isSingleProp: false,
	name: 'loading-screen',
	schema: {
		dotsColor: {
			type: 'color',
			default: 'white',
		},
		backgroundColor: {
			type: 'color',
			default: '#24CAFF',
		},
		enabled: {
			type: 'boolean',
			default: true,
		},
	},
};

export default loadingScreen;
