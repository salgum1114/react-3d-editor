import { IComponentDescriptor } from '../components';

const embedded: IComponentDescriptor = {
    isSingleProp: true,
    schema: {
        type: 'boolean',
        default: true,
    },
};

export default embedded;
