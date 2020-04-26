import { PropertyTypes } from 'aframe';
import { GeometryPrimitive } from './primitive';

export type ComponentType =
	| 'background'
	| 'camera'
	| 'collada-model'
	| 'cursor'
	| 'daydream-controls'
	| 'debug'
	| 'embedded'
	| 'fog'
	| 'gearvr-controls'
	| 'geometry'
	| 'gltf-model'
	| 'hand-controls'
	| 'keyboard-shortcuts'
	| 'laser-controls'
	| 'light'
	| 'line'
	| 'link'
	| 'loo-controls'
	| 'material'
	| 'obj-model'
	| 'oculus-touch-controls'
	| 'pool'
	| 'position'
	| 'raycaster'
	| 'rotation'
	| 'scale'
	| 'screenshot'
	| 'shadow'
	| 'sound'
	| 'stats'
	| 'text'
	| 'tracked-controls'
	| 'visible'
	| 'vive-controls'
	| 'vr-mode-ui'
	| 'wasd-controls'
	| 'windows-motion-controls';

export type GeneralComponentType = 'position' | 'rotation' | 'scale' | 'visible' | 'name' | 'class';

export const GeneralComponents: GeneralComponentType[] = ['name', 'class', 'position', 'rotation', 'scale', 'visible'];

export type ComponentNames =
	| 'animation'
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
	| 'image';

export type PropertyType = PropertyTypes | 'video' | 'audio' | 'file' | 'image';

export type GeometryDefault = {
	[P in GeometryPrimitive]: any;
};

export interface ISingleProperty {
	type: PropertyType;
	default?: any;
	oneOf?: string[];
	min?: number;
	max?: number;
	if?: Record<any, any>;
	values?: Record<any, any>;
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
