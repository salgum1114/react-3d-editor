import { IComponentDescriptor } from '../components';

const viveControls: IComponentDescriptor = {
    isSingleProp: false,
    schema: {
        buttonColor: {
            type: 'color',
            default: '#fafafa',
        },
        buttonHighlightColor: {
            type: 'color',
            default: '#22d1ee',
        },
        hand: {
            type: 'string',
            default: 'left',
            oneOf: ['left', 'right'],
        },
        model: {
            type: 'boolean',
            default: true,
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
};

export default viveControls;
