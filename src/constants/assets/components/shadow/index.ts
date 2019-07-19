import { IComponentDescriptor } from '../components';

const shadow: IComponentDescriptor = {
    isSingleProp: false,
    name: 'shadow',
    schema: {
        cast: {
            type: 'boolean',
            default: true,
        },
        receive: {
            type: 'boolean',
            default: true,
        },
    },
};

export default shadow;
