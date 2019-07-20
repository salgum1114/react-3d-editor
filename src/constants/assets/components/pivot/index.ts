import { IComponentDescriptor } from '../components';

const pivot: IComponentDescriptor = {
    isSingleProp: true,
    name: 'pivot',
    schema: {
        type: 'vec3',
        default: {
            x: 0,
            y: 0,
            z: 0,
        },
    },
};

export default pivot;
