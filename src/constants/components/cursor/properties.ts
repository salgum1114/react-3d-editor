import { IProperties } from '../components';

export interface ICursorProperties {
    downEvents: IProperties;
    fuse: IProperties;
    fuseTimeout: IProperties;
    rayOrigin: IProperties;
    upEvents: IProperties;
}

export const properties: ICursorProperties = {
    downEvents: {
        property: 'downEvents',
        description: 'Array of additional events on the entity to listen to for triggering mousedown (e.g., triggerdown for vive-controls).',
        defaultValue: [],
    },
    fuse: {
        property: 'fuse',
        description: 'Whether cursor is fuse-based.',
        defaultValue: false,
    },
    fuseTimeout: {
        property: 'fuseTimeout',
        description: 'How long to wait (in milliseconds) before triggering a fuse-based click event.',
        defaultValue: 1500,
    },
    rayOrigin: {
        property: 'rayOrigin',
        description: 'Where the intersection ray is cast from (i.e.,entity or mouse)',
        defaultValue: 'entity',
    },
    upEvents: {
        property: 'upEvents',
        description: 'Array of additional events on the entity to listen to for triggering mouseup (e.g., trackpadup for daydream-controls).',
        defaultValue: [],
    },
}
