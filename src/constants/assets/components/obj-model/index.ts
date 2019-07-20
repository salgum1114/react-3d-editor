import { IComponentDescriptor } from '../components';

const objModel: IComponentDescriptor = {
    isSingleProp: false,
    name: 'obj-model',
    schema: {
        mtl: {
            type: 'model',
        },
        obj: {
            type: 'model',
        },
    },
};

export default objModel;
