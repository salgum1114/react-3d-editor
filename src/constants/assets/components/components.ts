import { PropertyTypes } from 'aframe';

export type PropertyType = PropertyTypes
| 'video'
| 'audio'
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

export type GeometryDefault = {
    [P in GeometryPrimitive]: any;
}

export type Record<K extends string = any, T = any> = {
    [P in K]: T;
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
}

export type IMultipleProperty<K extends string = any> = {
    [P in K]: ISingleProperty;
}

export type ISchema<K extends string> = ISingleProperty | IMultipleProperty<K>;

export interface IComponentDescriptor<K extends string = any> {
    isSingleProp: boolean;
    schema: ISchema<K>;
    multiple?: boolean;
    dependencies?: string[];
    name?: string;
}

export const ControlsHand = ['left', 'right'];

export const TextAlign = ['left', 'right', 'center'];

export const TextAnchor = ['left', 'right', 'center', 'align'];

export const TextBaseline = ['top', 'center', 'bottom'];

export const TextFont = ['roboto', 'aileronsemibold', 'dejavu', 'exo2bold', 'exo2semibold', 'kelsonsans', 'monoid', 'mozillavr', 'sourcecodeprop'];

export const TextSide = ['front', 'back', 'double'];

export const TextWhiteSpace = ['normal', 'pre', 'nowrap'];

export const TextShader = ['flat', 'ios10hls', 'msdf', 'portal', 'sdf', 'standard'];

export const SoundDistanceModel = ['linear', 'inverse', 'exponential'];

export const RaycasterObjects = ['distance', 'point', 'face', 'faceIndex', 'indices', 'object', 'uv'];