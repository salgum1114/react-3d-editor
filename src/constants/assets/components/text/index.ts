import { IComponentDescriptor, TextAlign, TextAnchor, TextBaseline, TextFont, Side, TextWhiteSpace, Shader } from '../components';

const text: IComponentDescriptor = {
    isSingleProp: false,
    multiple: true,
    name: 'text',
    schema: {
        value: {
            type: 'string',
        },
        align: {
            type: 'string',
            default: 'left',
            oneOf: TextAlign,
        },
        alpahTest: {
            type: 'number',
            default: 0.5,
        },
        anchor: {
            type: 'string',
            default: 'center',
            oneOf: TextAnchor,
        },
        baseline: {
            type: 'string',
            default: 'center',
            oneOf: TextBaseline,
        },
        color: {
            type: 'color',
            default: '#fff',
        },
        font: {
            type: 'string',
            default: 'roboto',
            oneOf: TextFont,
        },
        fontImage: {
            type: 'string',
        },
        height: {
            type: 'number',
            default: 0,
        },
        letterSpacing: {
            type: 'number',
            default: 0,
        },
        lineHeight: {
            type: 'number',
            default: 0,
        },
        negate: {
            type: 'boolean',
            default: true,
        },
        opacity: {
            type: 'number',
            default: 1,
        },
        shader: {
            type: 'string',
            default: 'sdf',
            oneOf: Shader,
        },
        side: {
            type: 'string',
            default: 'front',
            oneOf: Side,
        },
        tabSize: {
            type: 'number',
            default: 4,
        },
        transparent: {
            type: 'boolean',
            default: true,
        },
        whiteSpace: {
            type: 'string',
            default: 'normal',
            oneOf: TextWhiteSpace,
        },
        width: {
            type: 'number',
            default: 0,
        },
        wrapCount: {
            type: 'number',
            default: 40,
        },
        wrapPixels: {
            type: 'number',
            default: 0,
        },
        xOffset: {
            type: 'number',
            default: 0,
        },
        yOffset: {
            type: 'number',
            default: 0,
        },
        zOffset: {
            type: 'number',
            default: 0.001,
        },
    },
};

export default text;
