import { IComponentDescriptor } from '../components';

const scale: IComponentDescriptor = {
    isSingleProp: true,
    name: 'scale',
    schema: {
        type: 'vec3',
        default: {
            x: 1,
            y: 1,
            z: 1,
        },
    },
};

export default scale;
