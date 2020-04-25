import { PropertyTypes } from 'aframe';
import { Record } from '../../../types/utils';

export type PropertyType = PropertyTypes
| 'video'
| 'audio'
| 'file'
| 'image'
;

export type GeometryPrimitive = 'box'
| 'circle'
| 'cone'
| 'cylinder'
| 'dodecahedron'
| 'icosahedron'
| 'octahedron'
| 'plane'
| 'ring'
| 'sphere'
| 'tetrahedron'
| 'torus'
| 'torusKnot'
| 'triangle'
;

export type ComponentNames = 'animation'
| 'camera'
| 'cursor'
| 'daydream-controls'
| 'gearvr-controls'
| 'geometry'
| 'gltf-model'
| 'hand-controls'
| 'laser-controls'
| 'light'
| 'line'
| 'link'
| 'look-controls'
| 'material'
| 'obj-model'
| 'oculus-go-controls'
| 'oculus-touch-controls'
| 'position'
| 'raycaster'
| 'rotation'
| 'scale'
| 'shadow'
| 'sound'
| 'text'
| 'tracked-controls'
| 'tracked-controls-webvr'
| 'tracked-controls-webxr'
| 'visible'
| 'vive-controls'
| 'vive-focus-controls'
| 'wasd-controls'
| 'windows-motion-controls'
| 'background'
| 'debug'
| 'embedded'
| 'inspector'
| 'fog'
| 'keyboard-shortcuts'
| 'pool'
| 'screenshot'
| 'stats'
| 'vr-mode-ui'
| 'pivot'
| 'name'
| 'loading-screen'
| 'audio'
| 'video'
| 'file'
| 'image'
;

export type GeometryDefault = {
    [P in GeometryPrimitive]: any;
}

export interface ISingleProperty {
    type: PropertyType;
    default?: any;
    oneOf?: string[];
    min?: number;
    max?: number;
    if?: Record;
    values?: Record;
    schemaChange?: boolean;
    [key: string]: any;
}

export interface IMultipleProperty {
    [key: string]: ISingleProperty;
}

export type ISchema = ISingleProperty | IMultipleProperty;

export interface IComponentDescriptor {
    isSingleProp: boolean;
    schema: ISchema;
    multiple?: boolean;
    dependencies?: ComponentNames[];
    name?: ComponentNames;
}

export const ControlsHand = ['left', 'right'];

export const TextAlign = ['left', 'right', 'center'];

export const TextAnchor = ['left', 'right', 'center', 'align'];

export const TextBaseline = ['top', 'center', 'bottom'];

export const TextFont = ['roboto', 'aileronsemibold', 'dejavu', 'exo2bold', 'exo2semibold', 'kelsonsans', 'monoid', 'mozillavr', 'sourcecodeprop'];

export const Side = ['front', 'back', 'double'];

export const TextWhiteSpace = ['normal', 'pre', 'nowrap'];

export const Shader = ['flat', 'ios10hls', 'msdf', 'portal', 'sdf', 'standard'];

export const SoundDistanceModel = ['linear', 'inverse', 'exponential'];

export const RaycasterObjects = ['distance', 'point', 'face', 'faceIndex', 'indices', 'object', 'uv'];

export const MaterialBlending = ['none', 'normal', 'additive', 'subtractive', 'multiply'];

export const MaterialVertexColors = ['none', 'face', 'vertex'];