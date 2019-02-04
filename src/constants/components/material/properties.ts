import { IProperties } from '../components';

export interface IMaterialProperties {
    alphaTest: IProperties;
    depthTest: IProperties;
    flatShading: IProperties;
    npot: IProperties;
    offset: IProperties;
    opacity: IProperties;
    repeat: IProperties;
    shader: IProperties;
    side: IProperties;
    transparent: IProperties;
    vertexColors: IProperties;
    visible: IProperties;
}

export const properties: IMaterialProperties = {
    alphaTest: {
        property: 'alphaTest',
        description: 'Alpha test threshold for transparency.',
        defaultValue: 0,
    },
    depthTest: {
        property: 'depthTest',
        description: 'Whether depth testing is enabled when rendering the material.',
        defaultValue: true,
    },
    flatShading: {
        property: 'flatShading',
        description: 'Use THREE.FlatShading rather than THREE.StandardShading.',
        defaultValue: false,
    },
    npot: {
        property: 'npot',
        description: 'Use settings for non-power-of-two (NPOT) texture.',
        defaultValue: false,
    },
    offset: {
        property: 'offset',
        description: 'Texture offset to be used.',
        defaultValue: { x: 0, y: 0 },
    },
    opacity: {
        property: 'opacity',
        description: 'Extent of transparency. If the transparent property is not true, then the material will remain opaque and opacity will only affect color.',
        defaultValue: 1.0,
    },
    repeat: {
        property: 'repeat',
        description: 'Texture repeat to be used.',
        defaultValue: { x: 1, y: 1 },
    },
    shader: {
        property: 'shader',
        description: 'Which material to use. Defaults to the standard material. Can be set to the flat material or to a registered custom shader material.',
        defaultValue: 'standard',
    },
    side: {
        property: 'side',
        description: 'Which sides of the mesh to render. Can be one of front, back, or double.',
        defaultValue: 'front',
    },
    transparent: {
        property: 'transparent',
        description: 'Whether material is transparent. Transparent entities are rendered after non-transparent entities.',
        defaultValue: false,
    },
    vertexColors: {
        property: 'vertexColors',
        description: 'Whether to use vertex or face colors to shade the material. Can be one of none, vertex, or face.',
        defaultValue: 'none',
    },
    visible: {
        property: 'visible',
        description: 'Whether material is visible. Raycasters will ignore invisible materials.',
        defaultValue: true,
    },
}

export interface IStandardProperties {
    ambientOcclusionMap: IProperties;
    ambientOcclusionMapIntensity: IProperties;
    ambientOcclusionTextureRepeat: IProperties;
    ambientOcclusionTextureOffset: IProperties;
    color: IProperties;
    displacementMap: IProperties;
    displacementScale: IProperties;
    displacementBias: IProperties;
    displacementTextureRepeat: IProperties;
    displacementTextureOffset: IProperties;
    emissive: IProperties;
    emissiveIntensity: IProperties;
    height: IProperties;
    envMap: IProperties;
    fog: IProperties;
    metalness: IProperties;
    normalMap: IProperties;
    normalScale: IProperties;
    normalTextureRepeat: IProperties;
    normalTextureOffset: IProperties;
    repeat: IProperties;
    roughness: IProperties;
    sphericalEnvMap: IProperties;
    width: IProperties;
    wireframe: IProperties;
    wireframeLinewidth: IProperties;
    src: IProperties;
}

export const standardProperties: IStandardProperties = {
    ambientOcclusionMap: {
        property: 'ambientOcclusionMap',
    },
    ambientOcclusionMapIntensity: {
        property: 'ambientOcclusionMapIntensity',
        defaultValue: 1,
    },
    ambientOcclusionTextureRepeat: {
        property: 'ambientOcclusionTextureRepeat',
        defaultValue: '1 1',
    },
    ambientOcclusionTextureOffset: {
        property: 'ambientOcclusionTextureOffset',
        defaultValue: '0 0',
    },
    color: {
        property: 'color',
        defaultValue: '#fff',
    },
    displacementMap: {
        property: 'displacementMap',
    },
    displacementScale: {
        property: 'displacementScale',
        defaultValue: 1,
    },
    displacementBias: {
        property: 'displacementBias',
        defaultValue: '0.5',
    },
    displacementTextureRepeat: {
        property: 'displacementTextureRepeat',
        defaultValue: '1 1',
    },
    displacementTextureOffset: {
        property: 'displacementTextureOffset',
        defaultValue: '0 0',
    },
    emissive: {
        property: 'emissive',
        defaultValue: '#000',
    },
    emissiveIntensity: {
        property: 'emissiveIntensity',
        defaultValue: 1,
    },
    height: {
        property: 'height',
        defaultValue: 360,
    },
    envMap: {
        property: 'envMap',
    },
    fog: {
        property: 'fog',
    },
    metalness: {
        property: 'metalness',
    },
    normalMap: {
        property: 'normalMap',
    },
    normalScale: {
        property: 'normalScale',
        defaultValue: '1 1',
    },
    normalTextureRepeat: {
        property: 'normalTextureRepeat',
        defaultValue: '1 1',
    },
    normalTextureOffset: {
        property: 'normalTextureOffset',
        defaultValue: '0 0',
    },
    repeat: {
        property: 'repeat',
        defaultValue: '1 1',
    },
    roughness: {
        property: 'roughness',
        defaultValue: 0.5,
    },
    sphericalEnvMap: {
        property: 'sphericalEnvMap',
    },
    width: {
        property: 'width',
        defaultValue: 640,
    },
    wireframe: {
        property: 'wireframe',
        defaultValue: false,
    },
    wireframeLinewidth: {
        property: 'wireframeLinewidth',
        defaultValue: 2,
    },
    src: {
        property: 'src',
    },
}

export interface IFlatProperties {
    color: IProperties;
    fog: IProperties;
    height: IProperties;
    repeat: IProperties;
    src: IProperties;
    width: IProperties;
    wireframe: IProperties;
    wireframeLinewidth: IProperties;
}

export const flatProperties: IFlatProperties = {
    color: {
        property: 'color',
        defaultValue: '#fff',
    },
    fog: {
        property: 'fog',
        defaultValue: true,
    },
    height: {
        property: 'height',
        defaultValue: 360,
    },
    repeat: {
        property: 'repeat',
        defaultValue: '1 1',
    },
    src: {
        property: 'src',
    },
    width: {
        property: 'width',
        defaultValue: 640,
    },
    wireframe: {
        property: 'wireframe',
        defaultValue: false,
    },
    wireframeLinewidth: {
        property: 'wireframeLinewidth',
        defaultValue: 2,
    },
}

export interface IRegisterShaderProperties {
    fragmentShader: IProperties;
    init: IProperties;
    raw: IProperties;
    schema: IProperties;
    update: IProperties;
    vertexShader: IProperties;
}
