import { IComponentDescriptor } from '../components';

const laserControls: IComponentDescriptor = {
    isSingleProp: false,
    schema: {
        defaultModelColr: {
            type: 'color',
            default: 'grey',
        },
        hand: {
            type: 'string',
            oneOf: ['left', 'right'],
            default: 'right',
        },
        model: {
            type: 'boolean',
            default: true,
        },
    },
};

export default laserControls;
