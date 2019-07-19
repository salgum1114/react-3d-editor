import { IComponentDescriptor, RaycasterObjects } from '../components';

const raycaster: IComponentDescriptor = {
    isSingleProp: false,
    multiple: true,
    name: 'raycaster',
    schema: {
        enabled: {
            type: 'boolean',
            default: true,
        },
        autoRefresh: {
            type: 'boolean',
            default: true,
        },
        direction: {
            type: 'vec3',
            default: {
                x: 0,
                y: 0,
                z: -1,
            },
        },
        far: {
            type: 'number',
            default: 1000,
        },
        interval: {
            type: 'number',
            default: 0,
        },
        near: {
            type: 'number',
            default: 0,
        },
        objects: {
            type: 'string',
            oneOf: RaycasterObjects,
        },
        origin: {
            type: 'vec3',
            default: {
                x: 0,
                y: 0,
                z: 0,
            },
        },
        showLine: {
            type: 'boolean',
            default: false,
        },
        useWorldCoordinates: {
            type: 'boolean',
            default: false,
        },
    },
};

export default raycaster;
