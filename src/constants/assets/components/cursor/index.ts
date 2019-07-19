import { IComponentDescriptor } from '../components';

const cursor: IComponentDescriptor = {
    isSingleProp: false,
    schema: {
        downEvents: {
            type: 'array',
            default: [],
            items: ['click', 'fusing', 'mousedown', 'mouseenter', 'mouseleave', 'mouseup'],
        },
        fuse: {
            type: 'boolean',
            default: false,
        },
        fuseTimeout: {
            type: 'number',
            default: 1500,
            min: 0,
        },
        mouseCursorStylesEnabled: {
            type: 'boolean',
            default: true,
        },
        rayOrigin: {
            type: 'string',
            default: 'entity',
            oneOf: ['mouse', 'entity'],
        },
        upEvents: {
            type: 'array',
            default: [],
            items: ['click', 'fusing', 'mousedown', 'mouseenter', 'mouseleave', 'mouseup'],
        },
    },
};

export default cursor;
