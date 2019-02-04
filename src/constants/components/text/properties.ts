import { IProperties } from '../components';

export interface ITextProperties {
    align: IProperties;
    alphaTest: IProperties;
    anchor: IProperties;
    baseline: IProperties;
    color: IProperties;
    font: IProperties;
    fontImage: IProperties;
    height: IProperties;
    letterSpacing: IProperties;
    lineHeight: IProperties;
    opacity: IProperties;
    shader: IProperties;
    side: IProperties;
    tabSize: IProperties;
    transparent: IProperties;
    value: IProperties;
    whiteSpace: IProperties;
    width: IProperties;
    wrapCount: IProperties;
    wrapPixels: IProperties;
    xOffset: IProperties;
    zOffset: IProperties;
}

export const properties: ITextProperties = {
    align: {
        property: 'align',
        description: 'Multi-line text alignment (left, center, right).',
        defaultValue: 'left',
    },
    alphaTest: {
        property: 'alphaTest',
        description: 'Discard text pixels if alpha is less than this value.',
        defaultValue: 0.5,
    },
    anchor: {
        property: 'anchor',
        description: 'Horizontal positioning (left, center, right, align).',
        defaultValue: 'center',
    },
    baseline: {
        property: 'baseline',
        description: 'Vertical positioning (top, center, bottom).',
        defaultValue: 'center',
    },
    color: {
        property: 'color',
        description: 'Text color.',
        defaultValue: 'white',
    },
    font: {
        property: 'font',
        description: 'Font to render text, either the name of one of A-Frame’s stock fonts or a URL to a font file',
        defaultValue: 'default',
    },
    fontImage: {
        property: 'fontImage',
        description: 'Font image texture path to render text. Defaults to the font‘s name with extension replaced to .png. Don’t need to specify if using a stock font.',
    },
    height: {
        property: 'height',
        description: 'Height of text block.',
    },
    letterSpacing: {
        property: 'letterSpacing',
        description: 'Letter spacing in pixels.',
        defaultValue: 0,
    },
    lineHeight: {
        property: 'lineHeight',
        description: 'Line height in pixels.',
    },
    opacity: {
        property: 'opacity',
        description: 'Opacity, on a scale from 0 to 1, where 0 means fully transparent and 1 means fully opaque.',
        defaultValue: '1.0',
    },
    shader: {
        property: 'shader',
        description: 'Shader used to render text.',
        defaultValue: 'sdf',
    },
    side: {
        property: 'side',
        description: 'Side to render. (front, back, double)',
        defaultValue: 'front',
    },
    tabSize: {
        property: 'tabSize',
        description: 'Tab size in spaces.',
        defaultValue: '4',
    },
    transparent: {
        property: 'transparent',
        description: 'Whether text is transparent.',
        defaultValue: true,
    },
    value: {
        property: 'value',
        description: 'The actual content of the text. Line breaks and tabs are supported with \n and \t.',
        defaultValue: '',
    },
    whiteSpace: {
        property: 'whiteSpace',
        description: 'How whitespace should be handled (i.e., normal, pre, nowrap). Read more about whitespace.',
        defaultValue: 'normal',
    },
    width: {
        property: 'width',
        description: 'Width in meters.',
    },
    wrapCount: {
        property: 'wrapCount',
        description: 'Number of characters before wrapping text (more or less).',
        defaultValue: 40,
    },
    wrapPixels: {
        property: 'wrapPixels',
        description: 'Number of pixels before wrapping text.',
    },
    xOffset: {
        property: 'xOffset',
        description: 'X-offset to apply to add padding.',
        defaultValue: 0,
    },
    zOffset: {
        property: 'zOffset',
        description: 'Z-offset to apply to avoid Z-fighting if using with a geometry as a background.',
        defaultValue: 0.001,
    },
}
