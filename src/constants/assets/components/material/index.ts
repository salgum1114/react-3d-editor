import { IComponentDescriptor, MaterialBlending, Shader, Side, MaterialVertexColors } from '../components';

const material: IComponentDescriptor = {
    isSingleProp: false,
    name: 'material',
    schema: {
        alphaTest: {
            type: 'number',
            default: 0,
            min: 0,
            max: 1,
        },
        ambientOcclusionMap: {
            type: 'map',
        },
        ambientOcclusionMapIntensity: {
            default: 1,
            type: 'number',
        },
        ambientOcclusionTextureOffset: {
            type: 'vec2',
            default: {
                x: 0,
                y: 0,
            },
        },
        ambientOcclusionTextureRepeat: {
            type: 'vec2',
            default: {
                x: 1,
                y: 1,
            },
        },
        blending: {
            type: 'string',
            default: 'normal',
            oneOf: MaterialBlending,
        },
        color: {
            type: 'color',
            default: '#FFF',
        },
        depthTest: {
            default: true,
            type: 'boolean',
        },
        depthWrite: {
            default: true,
            type: 'boolean',
        },
        displacementBias: {
            default: 0.5,
            type: 'number',
        },
        displacementMap: {
            type: 'map',
        },
        displacementScale: {
            default: 1,
            type: 'number',
        },
        displacementTextureOffset: {
            type: 'vec2',
            default: {
                x: 0,
                y: 0,
            },
        },
        displacementTextureRepeat: {
            type: 'vec2',
            default: {
                x: 1,
                y: 1,
            },
        },
        emissive: {
            type: 'color',
            default: '#000',
        },
        emissiveIntensity: {
            type: 'number',
            default: 1,
        },
        envMap: {
            type: 'string',
        },
        flatShading: {
            type: 'boolean',
            default: false,
        },
        fog: {
            type: 'boolean',
            default: true,
        },
        height: {
            type: 'number',
            default: 256,
        },
        metalness: {
            type: 'number',
            default: 0,
            min: 0,
            max: 1,
        },
        metalnessMap: {
            type: 'map',
        },
        metalnessTextureOffset: {
            type: 'vec2',
            default: {
                x: 0,
                y: 0,
            },
        },
        metalnessTextureRepeat: {
            type: 'vec2',
            default: {
                x: 1,
                y: 1,
            },
        },
        normalMap: {
            type: 'map',
        },
        normalScale: {
            type: 'vec2',
            default: {
                x: 1,
                y: 1,
            },
        },
        normalTextureOffset: {
            type: 'vec2',
            default: {
                x: 0,
                y: 0,
            },
        },
        normalTextureRepeat: {
            type: 'vec2',
            default: {
                x: 1,
                y: 1,
            },
        },
        npot: {
            type: 'boolean',
            default: false,
        },
        offset: {
            type: 'vec2',
            default: {
                x: 0,
                y: 0,
            },
        },
        opacity: {
            type: 'number',
            default: 1,
            min: 0,
            max: 1,
        },
        repeat: {
            type: 'vec2',
            default: {
                x: 1,
                y: 1,
            },
        },
        roughness: {
            type: 'number',
            default: 0.5,
            min: 0,
            max: 1,
        },
        roughnessMap: {
            type: 'map',
        },
        roughnessTextureOffset: {
            type: 'vec2',
            default: {
                x: 0,
                y: 0,
            },
        },
        roughnessTextureRepeat: {
            type: 'vec2',
            default: {
                x: 1,
                y: 1,
            },
        },
        shader: {
            type: 'string',
            default: 'standard',
            oneOf: Shader,
            schemaChange: true,
        },
        side: {
            type: 'string',
            default: 'front',
            oneOf: Side,
        },
        sphericalEnvMap: {
            type: 'map',
        },
        src: {
            type: 'map',
        },
        transparent: {
            type: 'boolean',
            default: false,
        },
        vertexColors: {
            type: 'string',
            default: 'none',
            oneOf: MaterialVertexColors,
        },
        visible: {
            type: 'boolean',
            default: true,
        },
        width: {
            type: 'number',
            default: 512,
        },
        wireframe: {
            type: 'boolean',
            default: false,
        },
        wireframeLinewidth: {
            type: 'number',
            default: 2,
        },
    },
};

export default material;
