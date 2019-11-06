import { Entity } from 'aframe';

export type PrimitiveType = 'a-box'
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
| 'a-icon'
;

export type ArType = 'a-marker'
| 'a-marker-camera'
;

export type CoreType = 'a-entity'
| 'a-scene'
;

export type AssetType = 'a-mixin'
| 'a-asset-item'
| 'video'
| 'audio'
| 'img'
;

export type ComponentType = 'background'
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
| 'windows-motion-controls'
;

export type AllType = PrimitiveType | CoreType | ArType | AssetType | string;

export type EntityType = PrimitiveType | CoreType | string;

export interface IAttribute {
    attribute: string;
    componentMapping?: string;
    default?: string | number | boolean;
    value?: string | number | boolean;
}

export interface IAttributes {
    [key: string]: IAttribute;
}

export interface IFragement {
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
    fragment?: IFragement;
}

export interface IEntity {
    id?: string | number;
    key?: string | number;
    type?: string;
    title?: string | boolean;
    icon?: string;
    parentKey?: string | number;
    entity?: Entity;
    children?: IEntity[];
    mixin?: string;
}

export interface IDetailEntity {
    component: string;
    entity: Entity;
    property: string;
    value: any;
}

export const primitives: IPrimitive[] = [
    {
        key: 'a-entity',
        type: 'a-entity',
        title: 'Entity',
        description: 'A-Frame represents an entity via the <a-entity> element. As defined in the entity-component-system pattern, entities are placeholder objects to which we plug in components to provide them appearance, behavior, and functionality.',
        url: 'https://aframe.io/docs/0.9.0/core/entity.html',
        attributes: [],
    },
    {
        key: 'a-anchor',
        type: 'a-anchor',
        title: 'Anchor',
        description: '',
        url: 'https://github.com/jeromeetienne/AR.js/tree/master/aframe',
        attributes: [],
    },
    {
        key: 'a-box',
        type: 'a-box',
        title: 'Box',
        description: 'The box primitive creates shapes such as boxes, cubes, or walls.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-box.html',
        attributes: [],
    },
    {
        key: 'a-camera',
        type: 'a-camera',
        title: 'Camera',
        description: 'The camera primitive determines what the user sees. We can change the viewport by modifying the camera entity’s position and rotation.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-camera.html',
        attributes: [],
    },
    {
        key: 'a-camera-static',
        type: 'a-camera-static',
        title: 'Camera Static',
        description: 'The camera primitive determines what the user sees. We can change the viewport by modifying the camera entity’s position and rotation.',
        url: 'https://github.com/jeromeetienne/AR.js/tree/master/aframe',
        attributes: [
            {
                attribute: 'camera',
                default: 'active: false;',
            },
        ],
    },
    {
        key: 'a-circle',
        type: 'a-circle',
        title: 'Circle',
        description: 'The circle primitive creates circles surfaces using the geometry component with the type set to circle.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-circle.html',
        attributes: [],
    },
    {
        key: 'a-collada-model',
        type: 'a-collada-model',
        title: 'Collada Model',
        description: 'The COLLADA model primitive displays a 3D COLLADA model created from a 3D modeling program or downloaded from the web.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-collada-model.html',
        attributes: [],
    },
    {
        key: 'a-cone',
        type: 'a-cone',
        title: 'Cone',
        description: 'The cone primitive creates a cone shape.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-cone.html',
        attributes: [],
    },
    {
        key: 'a-cursor',
        type: 'a-cursor',
        title: 'Cursor',
        description: 'The cursor primitive is a reticle that allows for clicking and basic interactivity with a scene on devices that do not have a hand controller. The default appearance is a ring geometry. The cursor is usually placed as a child of the camera.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-cursor.html',
        attributes: [],
    },
    {
        key: 'a-curvedimage',
        type: 'a-curvedimage',
        title: 'Curvedimage',
        description: `The curved image primitive creates images that bend around the user. Curved images arranged around the camera can be pleasing for legibility since each pixel sits at the same distance from the user. They can be a better choice than angled flat planes for complex layouts because they ensure a smooth surface rather than a series of awkward seams between planes.
            Under the hood, a curved image is a double-sided open-ended cylinder with textures mapped to the inside of the cylinder.`,
        url: 'https://aframe.io/docs/0.8.0/primitives/a-curvedimage.html',
        attributes: [],
    },
    {
        key: 'a-cylinder',
        type: 'a-cylinder',
        title: 'Cylinder',
        description: 'The cylinder primitive is used to create tubes and curved surfaces.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-cylinder.html',
        attributes: [],
    },
    {
        key: 'a-dodecahedron',
        type: 'a-dodecahedron',
        title: 'Dodecahedron',
        description: '',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-dodecahedron.html',
        attributes: [],
    },
    {
        key: 'a-gltf-model',
        type: 'a-gltf-model',
        title: 'Gltf Model',
        description: 'The glTF model primitive displays a 3D glTF model created from a 3D modeling program or downloaded from the web.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-gltf-model.html',
        attributes: [],
    },
    {
        key: 'a-icosahedron',
        type: 'a-icosahedron',
        title: 'Icosahedron',
        description: '',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-icosahedron.html',
        attributes: [],
    },
    {
        key: 'a-image',
        type: 'a-image',
        title: 'Image',
        description: 'The image primitive shows an image on a flat plane.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-image.html',
        attributes: [],
    },
    {
        key: 'a-light',
        type: 'a-light',
        title: 'Light',
        description: 'A light changes the lighting and shading of the scene.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-light.html',
        attributes: [],
    },
    {
        key: 'a-link',
        type: 'a-link',
        title: 'Link',
        description: 'The link primitive provides a compact API to define links that resembles the traditional <a> tag.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-link.html',
        attributes: [],
    },
    {
        key: 'a-marker',
        type: 'a-marker',
        title: 'Marker',
        description: '',
        url: 'https://aframe.io/blog/arjs/',
        attributes: [],
    },
    {
        key: 'a-obj-model',
        type: 'a-obj-model',
        title: 'Obj Model',
        description: 'The .OBJ model primitive displays a 3D Wavefront model.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-obj-model.html',
        attributes: [],
    },
    {
        key: 'a-octahedron',
        type: 'a-octahedron',
        title: 'Octahedron',
        description: '',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-octahedron.html',
        attributes: [],
    },
    {
        key: 'a-plane',
        type: 'a-plane',
        title: 'Plane',
        description: 'The plane primitive creates flat surfaces using the geometry component with the type set to plane.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-plane.html',
        attributes: [],
    },
    {
        key: 'a-ring',
        type: 'a-ring',
        title: 'Ring',
        description: 'The ring primitive creates a ring or disc shape.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-ring.html',
        attributes: [],
    },
    {
        key: 'a-sky',
        type: 'a-sky',
        title: 'Sky',
        description: 'The sky primitive adds a background color or 360° image to a scene. A sky is a large sphere with a color or texture mapped to the inside.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-sky.html',
        attributes: [],
    },
    {
        key: 'a-sound',
        type: 'a-sound',
        title: 'Sound',
        description: 'The sound primitive wraps the sound component.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-sound.html',
        attributes: [],
    },
    {
        key: 'a-sphere',
        type: 'a-sphere',
        title: 'Sphere',
        description: 'The sphere primitive creates a spherical or polyhedron shapes. It wraps an entity that prescribes the geometry component with its geometric primitive set to sphere.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-sphere.html',
        attributes: [],
    },
    {
        key: 'a-tetrahedron',
        type: 'a-tetrahedron',
        title: 'Tetrahedron',
        description: '',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-tetrahedron.html',
        attributes: [],
    },
    {
        key: 'a-text',
        type: 'a-text',
        title: 'Text',
        description: 'Wraps the text component.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-text.html',
        attributes: [],
    },
    {
        key: 'a-torus-knot',
        type: 'a-torus-knot',
        title: 'Torus Knot',
        description: 'The torus knot primitive creates pretzel shapes using the geometry component with the type set to torusKnot.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-torus-knot.html',
        attributes: [],
    },
    {
        key: 'a-torus',
        type: 'a-torus',
        title: 'Torus',
        description: 'The torus primitive creates donut or tube shapes using the geometry component with the type set to torus.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-torus.html',
        attributes: [],
    },
    {
        key: 'a-triangle',
        type: 'a-triangle',
        title: 'Triangle',
        description: 'The triangle primitive creates triangle surfaces using the geometry component with the type set to triangle.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-triangle.html',
        attributes: [],
    },
    {
        key: 'a-video',
        type: 'a-video',
        title: 'Video',
        description: 'The video primitive plays a video as a texture on a flat plane.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-video.html',
        attributes: [],
    },
    {
        key: 'a-videosphere',
        type: 'a-videosphere',
        title: 'Videosphere',
        description: 'The videosphere primitive plays 360° videos in the background of the scene. Videospheres are a large sphere with the video texture mapped to the inside.',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-videosphere.html',
        attributes: [],
    },
    {
        key: 'a-icon',
        type: 'a-icon',
        title: 'Icon',
        description: 'The Icon.',
        url: '',
        attributes: [],
    },
];

export const assetPrimitives: IPrimitive[] = [
    {
        key: 'a-mixin',
        type: 'a-mixin',
        title: 'Mixin',
        description: 'Mixins provide a way to compose and reuse commonly-used sets of component properties.',
        url: 'https://aframe.io/docs/0.9.0/core/mixins.html',
        attributes: [],
    },
    {
        key: 'a-asset-item',
        type: 'a-asset-item',
        title: 'Asset Item',
        description: 'Miscellaneous assets such as 3D models and materials',
        url: 'https://aframe.io/docs/0.9.0/core/asset-management-system.html',
        attributes: [],
    },
    {
        key: 'audio',
        type: 'audio',
        title: 'Audio',
        description: 'Sound files',
        url: 'https://aframe.io/docs/0.9.0/core/asset-management-system.html',
        attributes: [],
    },
    {
        key: 'img',
        type: 'img',
        title: 'Image',
        description: 'Image textures',
        url: 'https://aframe.io/docs/0.9.0/core/asset-management-system.html',
        attributes: [],
    },
    {
        key: 'video',
        type: 'video',
        title: 'Video',
        description: 'Video textures',
        url: 'https://aframe.io/docs/0.9.0/core/asset-management-system.html',
        attributes: [
            {
                attribute: 'autoplay',
                default: true,
            },
            {
                attribute: 'loop',
                default: false,
            },
        ],
    },
];
