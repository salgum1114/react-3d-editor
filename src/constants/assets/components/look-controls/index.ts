import { IComponentDescriptor } from '../components';

const lookControls: IComponentDescriptor = {
    isSingleProp: false,
    name: 'look-controls',
    schema: {
        enabled: {
            type: 'boolean',
            default: true,
        },
        hmdEnabled: {
            type: 'boolean',
            default: true,
        },
        pointerLockEnabled: {
            type: 'boolean',
            default: false,
        },
        reverseMouseDrag: {
            type: 'boolean',
            default: false,
        },
        reverseTouchDrag: {
            type: 'boolean',
            default: false,
        },
        touchEnabled: {
            type: 'boolean',
            default: true,
        },
    },
};

export default lookControls;
