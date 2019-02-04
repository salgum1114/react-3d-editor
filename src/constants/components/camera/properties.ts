import { IProperties } from '../components';

export interface ICameraProperties {
    active: IProperties;
    far: IProperties;
    fov: IProperties;
    near: IProperties;
    spectator: IProperties;
    zoom: IProperties;
}

export const properties: ICameraProperties = {
    active: {
        property: 'active',
        description: 'Whether the camera is the active camera in a scene with more than one camera.',
        defaultValue: true,
    },
    far: {
        property: 'far',
        description: 'Camera frustum far clipping plane.',
        defaultValue: 10000,
    },
    fov: {
        property: 'fov',
        description: 'Field of view (in degrees).',
        defaultValue: 80,
    },
    near: {
        property: 'near',
        description: 'Camera frustum near clipping plane.',
        defaultValue: 0.005,
    },
    spectator: {
        property: 'spectator',
        description: 'Whether the camera is used to render a third-person view of the scene on the 2D display while in VR mode.',
        defaultValue: false,
    },
    zoom: {
        property: 'zoom',
        description: '	Zoom factor of the camera.',
        defaultValue: 1,
    },
};
