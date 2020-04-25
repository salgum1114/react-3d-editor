import { IComponentDescriptor } from '../components';

const screenshot: IComponentDescriptor = {
    isSingleProp: false,
    name: 'screenshot',
    schema: {
        camera: {
            type: 'selector',
        },
        width: {
            type: 'number',
            default: 4096,
        },
        height: {
            type: 'number',
            default: 2048,
        },
    },
};

export default screenshot;
