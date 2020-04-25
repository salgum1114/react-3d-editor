import { IComponentDescriptor } from '../components';

const wasdControls: IComponentDescriptor = {
    isSingleProp: false,
    schema: {
        enabled: {
            type: 'boolean',
            default: true,
        },
        fly: {
            type: 'boolean',
            default: false,
        },
        acceleration: {
            type: 'number',
            default: 65,
        },
        adEnabled: {
            type: 'boolean',
            default: true,
        },
        adInverted: {
            type: 'boolean',
            default: false,
        },
        adAxis: {
            type: 'string',
            default: 'x',
            oneOf: ['x', 'y', 'z'],
        },
        wsEnabled: {
            type: 'boolean',
            default: true,
        },
        wsInverted: {
            type: 'boolean',
            default: false,
        },
        wsAxis: {
            type: 'string',
            default: 'z',
            oneOf: ['x', 'y', 'z'],
        },
    },
};

export default wasdControls;
