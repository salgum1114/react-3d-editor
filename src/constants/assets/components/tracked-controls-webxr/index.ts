import { IComponentDescriptor, ControlsHand } from '../components';

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
