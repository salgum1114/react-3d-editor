import { IComponentDescriptor, ControlsHand } from '../components';

const oculusGoControls: IComponentDescriptor = {
    isSingleProp: false,
    name: 'oculus-go-controls',
    schema: {
        armModel: {
            type: 'boolean',
            default: true,
        },
        buttonColor: {
            type: 'color',
            default: '#ffffff',
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
            oneOf: ControlsHand,
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

export default oculusGoControls;
