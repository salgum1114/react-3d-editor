import { IComponentDescriptor } from '../../../../models/component';
import { ControlsHand } from '../..';

const oculusTouchControls: IComponentDescriptor = {
	isSingleProp: false,
	name: 'oculus-touch-controls',
	schema: {
		buttonColor: {
			type: 'color',
			default: '#999',
		},
		buttonHighlightColor: {
			type: 'color',
			default: '#2df',
		},
		buttonTouchedColor: {
			type: 'color',
			default: '#8ab',
		},
		hand: {
			type: 'string',
			oneOf: ControlsHand,
			default: 'left',
		},
		model: {
			type: 'boolean',
			default: true,
		},
		orientationOffset: {
			type: 'vec3',
			default: {
				x: 43,
				y: 0,
				z: 0,
			},
		},
	},
};

export default oculusTouchControls;
