import { IComponentDescriptor } from '../components';

const debug: IComponentDescriptor = {
    isSingleProp: true,
    schema: {
        type: 'boolean',
        default: true,
    },
};

export default debug;
