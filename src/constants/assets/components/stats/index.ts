import { IComponentDescriptor } from '../components';

const stats: IComponentDescriptor = {
    isSingleProp: true,
    name: 'stats',
    schema: {
        type: 'boolean',
        default: true,
    },
};

export default stats;
