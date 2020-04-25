import { IComponentDescriptor } from '../components';

const fog: IComponentDescriptor = {
    isSingleProp: false,
    schema: {
        color: {
            type: 'color',
            default: '#000',
        },
        density: {
            type: 'number',
            default: 0.00025,
        },
        far: {
            type: 'number',
            default: 1000,
            min: 0,
        },
        near: {
            type: 'number',
            default: 1,
            min: 0,
        },
        type: {
            type: 'string',
            default: 'linear',
            oneOf: ['linear', 'exponential'],
        },
    },
};

export default fog;
