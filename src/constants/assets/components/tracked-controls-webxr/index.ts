import { IComponentDescriptor } from '../../../../models/component';
import { ControlsHand } from '../..';

const trackedControlsWebxr: IComponentDescriptor = {
	isSingleProp: false,
	schema: {
		hand: {
			type: 'string',
			oneOf: ControlsHand,
		},
	},
	name: 'tracked-controls-webxr',
};

export default trackedControlsWebxr;
