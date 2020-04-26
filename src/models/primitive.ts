export type ArType = 'a-marker' | 'a-marker-camera';

export type CoreType = 'a-entity' | 'a-scene';

export type AssetType = 'a-mixin' | 'a-asset-item' | 'video' | 'audio' | 'img';

export type PrimitiveType =
	| 'a-box'
	| 'a-camera'
	| 'a-circle'
	| 'a-collada-model'
	| 'a-cone'
	| 'a-cursor'
	| 'a-curvedimage'
	| 'a-cylinder'
	| 'a-dodecahedron'
	| 'a-gltf-model'
	| 'a-icosahedron'
	| 'a-image'
	| 'a-light'
	| 'a-link'
	| 'a-obj-model'
	| 'a-octahedron'
	| 'a-plane'
	| 'a-ring'
	| 'a-sky'
	| 'a-sound'
	| 'a-sphere'
	| 'a-tetrahedron'
	| 'a-text'
	| 'a-torus-knot'
	| 'a-torus'
	| 'a-triangle'
	| 'a-video'
	| 'a-videosphere'
	| 'a-icon';

export type GeometryPrimitive =
	| 'box'
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
	| 'triangle';

export type AllType = PrimitiveType | CoreType | ArType | AssetType | string;

export type EntityType = PrimitiveType | CoreType | string;

export interface IAttribute {
	attribute: string;
	componentMapping?: string;
	default?: any;
	value?: any;
}

export interface IAttributes {
	[key: string]: IAttribute;
}

export interface IFragment {
	entity?: string;
	asset?: string;
}

export interface IPrimitive {
	key: AllType | string;
	type: AllType | string;
	title?: string;
	description?: string;
	icon?: string;
	image?: string;
	url?: string;
	attributes?: IAttribute[];
	fragment?: IFragment;
}
