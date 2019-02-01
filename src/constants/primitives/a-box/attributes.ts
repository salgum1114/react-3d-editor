import { IAttribute, IAttributes } from '../primitives';

export interface IABoxAttributes extends IAttributes {
    ambientOcclusionMap?: IAttribute;
    ambientOcclusionMapIntensity?: IAttribute;
    ambientOcclusionTextureOffset?: IAttribute;
    ambientOcclusionTextureRepeat?: IAttribute;
    color?: IAttribute;
    depth?: IAttribute;
    displacementBias?: IAttribute;
    displacementMap?: IAttribute;
    displacementScale?: IAttribute;
    displacementTextureOffset?: IAttribute;
    displacementTextureRepeat?: IAttribute;
    envMap?: IAttribute;
    fog?: IAttribute;
    height?: IAttribute;
    metalness?: IAttribute;
    normalMap?: IAttribute;
    normalScale?: IAttribute;
    normalTextureOffset?: IAttribute;
    normalTextureRepeat?: IAttribute;
    repeat?: IAttribute;
    roughness?: IAttribute;
    segmentsDepth?: IAttribute;
    segmentsHeight?: IAttribute;
    segmentsWidth?: IAttribute;
    sphericalEnvMap?: IAttribute;
    src?: IAttribute;
    width?: IAttribute;
    wireframe?: IAttribute;
    wireframeLinewidth?: IAttribute;
}

export const attributes: IABoxAttributes = {
    ambientOcclusionMap: {
        attribute: 'ambient-occlusion-map',
        componentMapping: 'mateiral.ambientOcclusionMap',
    },
    ambientOcclusionMapIntensity: {
        attribute: 'ambient-occlusion-map-intensity',
        componentMapping: 'mateiral.ambientOcclusionMapIntensity',
        defaultValue: 1,
    },
    ambientOcclusionTextureOffset: {
        attribute: 'ambient-occlusion-texture-offset',
        componentMapping: 'mateiral.ambientOcclusionTextureOffset',
        defaultValue: '0 0',
    },
    ambientOcclusionTextureRepeat: {
        attribute: 'ambient-occlusion-texture-repeat',
        componentMapping: 'mateiral.ambientOcclusionTextureRepeat',
        defaultValue: '1 1',
    },
    color: {
        attribute: 'color',
        componentMapping: 'material.color',
        defaultValue: '#fff',
    },
    depth: {
        attribute: 'depth',
        componentMapping: 'geometry.depth',
        defaultValue: 1,
    },
    displacementBias: {
        attribute: 'displacement-bias',
        componentMapping: 'material.displacementBias',
        defaultValue: 0.5,
    },
    displacementMap: {
        attribute: 'displacement-map',
        componentMapping: 'material.displacementMap',
    },
    displacementScale: {
        attribute: 'displacement-scale',
        componentMapping: 'material.displacementScale',
        defaultValue: 1,
    },
    displacementTextureOffset: {
        attribute: 'displacement-texture-offset',
        componentMapping: 'material.displacementTextureOffset',
        defaultValue: '0 0',
    },
    displacementTextureRepeat: {
        attribute: 'displacement-texture-repeat',
        componentMapping: 'material.displacementTextureRepeat',
        defaultValue: '1 1',
    },
    envMap: {
        attribute: 'env-map',
        componentMapping: 'material.envMap',
    },
    fog: {
        attribute: 'fog',
        componentMapping: 'material.fog',
        defaultValue: true,
    },
    height: {
        attribute: 'height',
        componentMapping: 'geometry.height',
        defaultValue: 1,
    },
    metalness: {
        attribute: 'metalness',
        componentMapping: 'material.metalness',
        defaultValue: 0,
    },
    normalMap: {
        attribute: 'normal-map',
        componentMapping: 'material.normalMap',
    },
    normalScale: {
        attribute: 'normal-scale',
        componentMapping: 'material.normalScale',
        defaultValue: '1 1',
    },
    normalTextureOffset: {
        attribute: 'normal-texture-offset',
        componentMapping: 'material.normalTextureOffset',
        defaultValue: '0 0',
    },
    normalTextureRepeat: {
        attribute: 'normal-texture-repeat',
        componentMapping: 'material.normalTextureRepeat',
        defaultValue: '1 1',
    },
    repeat: {
        attribute: 'repeat',
        componentMapping: 'material.repeat',
        defaultValue: '1 1',
    },
    roughness: {
        attribute: 'roughness',
        componentMapping: 'material.roughness',
        defaultValue: 0.5,
    },
    segmentsDepth: {
        attribute: 'segments-depth',
        componentMapping: 'geometry.segmentsDepth',
        defaultValue: 1,
    },
    segmentsHeight: {
        attribute: 'segments-height',
        componentMapping: 'geometry.segmentsHeight',
        defaultValue: 1,
    },
    segmentsWidth: {
        attribute: 'segments-width',
        componentMapping: 'geometry.segmentsWidth',
        defaultValue: 1,
    },
    sphericalEnvMap: {
        attribute: 'spherical-env-map',
        componentMapping: 'material.sphericalEnvMap',
    },
    src: {
        attribute: 'src',
        componentMapping: 'material.src',
    },
    width: {
        attribute: 'width',
        componentMapping: 'geometry.width',
        defaultValue: 1,
    },
    wireframe: {
        attribute: 'wireframe',
        componentMapping: 'material.wireframe',
        defaultValue: false,
    },
    wireframeLinewidth: {
        attribute: 'wireframe-linewidth',
        componentMapping: 'material.wireframeLinewidth',
        defaultValue: 2,
    },
}
