import { IComponentDescriptor } from '../components';

const viveFocusControls: IComponentDescriptor = {
    isSingleProp: false,
    schema: {
        armModel: {
            type: 'boolean',
            default: true,
        },
        buttonHighlightColor: {
            type: 'color',
            default: '#7a7a7a',
        },
        buttonTouchedColor: {
            type: 'color',
            default: '#bbbbbb',
        },
        hand: {
            type: 'string',
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

export default viveFocusControls;
