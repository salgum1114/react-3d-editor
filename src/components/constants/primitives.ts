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
| 'a-marker'
| 'a-marker-camera'
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
;

export interface IAttribute {
    attribute: string;
    componentMapping: string;
    defaultValue?: string | number | boolean;
}

export interface IPrimitive {
    key: PrimitiveType;
    type: PrimitiveType;
    title?: string;
    description?: string;
    icon?: string;
    image?: string;
    url?: string;
    attributes?: IAttribute[];
}

const primitives: IPrimitive[] = [
    {
        key: 'a-box',
        type: 'a-box',
        title: '<a-box>',
        description: 'The box primitive creates shapes such as boxes, cubes, or walls.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-box.html',
        attributes: [

        ],
    },
    {
        key: 'a-camera',
        type: 'a-camera',
        title: '<a-camera>',
        description: 'The camera primitive determines what the user sees. We can change the viewport by modifying the camera entity’s position and rotation.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-camera.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-circle',
        type: 'a-circle',
        title: '<a-circle>',
        description: 'The circle primitive creates circles surfaces using the geometry component with the type set to circle.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-circle.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-collada-model',
        type: 'a-collada-model',
        title: '<a-collada-model>',
        description: 'The COLLADA model primitive displays a 3D COLLADA model created from a 3D modeling program or downloaded from the web.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-collada-model.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-cone',
        type: 'a-cone',
        title: '<a-cone>',
        description: 'The cone primitive creates a cone shape.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-cone.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-cursor',
        type: 'a-cursor',
        title: '<a-cursor>',
        description: 'The cursor primitive is a reticle that allows for clicking and basic interactivity with a scene on devices that do not have a hand controller. The default appearance is a ring geometry. The cursor is usually placed as a child of the camera.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-cursor.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-curvedimage',
        type: 'a-curvedimage',
        title: '<a-curvedimage>',
        description: `The curved image primitive creates images that bend around the user. Curved images arranged around the camera can be pleasing for legibility since each pixel sits at the same distance from the user. They can be a better choice than angled flat planes for complex layouts because they ensure a smooth surface rather than a series of awkward seams between planes.
            Under the hood, a curved image is a double-sided open-ended cylinder with textures mapped to the inside of the cylinder.`,
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-curvedimage.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-cylinder',
        type: 'a-cylinder',
        title: '<a-cylinder>',
        description: 'The cylinder primitive is used to create tubes and curved surfaces.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-cylinder.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-dodecahedron',
        type: 'a-dodecahedron',
        title: '<a-dodecahedron>',
        description: '',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-dodecahedron.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-gltf-model',
        type: 'a-gltf-model',
        title: '<a-gltf-model>',
        description: 'The glTF model primitive displays a 3D glTF model created from a 3D modeling program or downloaded from the web.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-gltf-model.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-icosahedron',
        type: 'a-icosahedron',
        title: '<a-icosahedron>',
        description: '',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-icosahedron.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-image',
        type: 'a-image',
        title: '<a-image>',
        description: 'The image primitive shows an image on a flat plane.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-image.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-light',
        type: 'a-light',
        title: '<a-light>',
        description: 'A light changes the lighting and shading of the scene.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-light.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-link',
        type: 'a-link',
        title: '<a-link>',
        description: 'The link primitive provides a compact API to define links that resembles the traditional <a> tag.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-link.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-marker',
        type: 'a-marker',
        title: '<a-marker>',
        description: '',
        icon: 'eye',
        url: 'https://aframe.io/blog/arjs/',
        attributes: [
            
        ],
    },
    {
        key: 'a-marker-camera',
        type: 'a-marker-camera',
        title: '<a-marker-camera>',
        description: '',
        icon: 'eye',
        url: 'https://aframe.io/blog/arjs/',
        attributes: [
            
        ],
    },
    {
        key: 'a-obj-model',
        type: 'a-obj-model',
        title: '<a-obj-model>',
        description: 'The .OBJ model primitive displays a 3D Wavefront model.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-obj-model.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-octahedron',
        type: 'a-octahedron',
        title: '<a-octahedron>',
        description: '',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-octahedron.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-plane',
        type: 'a-plane',
        title: '<a-plane>',
        description: 'The plane primitive creates flat surfaces using the geometry component with the type set to plane.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-plane.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-ring',
        type: 'a-ring',
        title: '<a-ring>',
        description: 'The ring primitive creates a ring or disc shape.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-ring.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-sky',
        type: 'a-sky',
        title: '<a-sky>',
        description: 'The sky primitive adds a background color or 360° image to a scene. A sky is a large sphere with a color or texture mapped to the inside.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-sky.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-sound',
        type: 'a-sound',
        title: '<a-sound>',
        description: 'The sound primitive wraps the sound component.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-sound.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-sphere',
        type: 'a-sphere',
        title: '<a-sphere>',
        description: 'The sphere primitive creates a spherical or polyhedron shapes. It wraps an entity that prescribes the geometry component with its geometric primitive set to sphere.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-sphere.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-tetrahedron',
        type: 'a-tetrahedron',
        title: '<a-tetrahedron>',
        description: '',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-tetrahedron.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-text',
        type: 'a-text',
        title: '<a-text>',
        description: 'Wraps the text component.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-text.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-torus-knot',
        type: 'a-torus-knot',
        title: '<a-torus-knot>',
        description: 'The torus knot primitive creates pretzel shapes using the geometry component with the type set to torusKnot.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-torus-knot.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-torus',
        type: 'a-torus',
        title: '<a-torus>',
        description: 'The torus primitive creates donut or tube shapes using the geometry component with the type set to torus.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-torus.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-triangle',
        type: 'a-triangle',
        title: '<a-triangle>',
        description: 'The triangle primitive creates triangle surfaces using the geometry component with the type set to triangle.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-triangle.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-video',
        type: 'a-video',
        title: '<a-video>',
        description: 'The video primitive plays a video as a texture on a flat plane.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-video.html',
        attributes: [
            
        ],
    },
    {
        key: 'a-videosphere',
        type: 'a-videosphere',
        title: '<a-videosphere>',
        description: 'The videosphere primitive plays 360° videos in the background of the scene. Videospheres are a large sphere with the video texture mapped to the inside.',
        icon: 'eye',
        url: 'https://aframe.io/docs/0.8.0/primitives/a-videosphere.html',
        attributes: [
            
        ],
    },
];

export default primitives;
