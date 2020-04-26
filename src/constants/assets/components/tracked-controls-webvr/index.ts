import { IComponentDescriptor } from '../../../../models/component';
import { ControlsHand } from '../..';

const trackedControlsWebvr: IComponentDescriptor = {
	isSingleProp: false,
	schema: {
		armMode: {
			type: 'boolean',
			default: true,
		},
		autoHide: {
			type: 'boolean',
			default: true,
		},
		controller: {
			type: 'number',
			default: 0,
		},
		hand: {
			type: 'string',
			oneOf: ControlsHand,
		},
		headElement: {
			type: 'selector',
		},
		id: {
			type: 'string',
		},
		idPrefix: {
			type: 'string',
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
	name: 'tracked-controls-webvr',
};

export default trackedControlsWebvr;
