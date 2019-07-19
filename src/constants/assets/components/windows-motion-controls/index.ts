import { IComponentDescriptor } from '../components';

const windowsMotionControls: IComponentDescriptor = {
    isSingleProp: false,
    schema: {
        hand: {
            type: 'string',
            default: 'right',
            oneOf: ['left', 'right'],
        },
        hideDisconnected: {
            type: 'boolean',
            default: true,
        },
        model: {
            type: 'boolean',
            default: true,
        },
        pair: {
            type: 'number',
            default: 0,
        },
    },
};

export default windowsMotionControls;
