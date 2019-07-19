import { IComponentDescriptor } from '../components';

const animation: IComponentDescriptor = {
    isSingleProp: false,
    multiple: true,
    schema: {
        property: {
            type: 'string',
        },
        isRawProperty: {
            type: 'boolean',
            default: false,
        },
        from: {
            type: 'string',
        },
        to: {
            type: 'string',
        },
        type: {
            type: 'string',
        },
        delay: {
            type: 'number',
            default: 0,
        },
        dir: {
            type: 'string',
            oneOf: ['normal', 'alterante', 'reverse'],
            default: 'normal',
        },
        dur: {
            type: 'number',
            default: 1000,
        },
        easing: {
            type: 'string',
            oneOf: [
                'linear',
                'easeInQuad', 'easeInCubic', 'easeInQuart', 'easeInQuint', 'easeInSine', 'easeInExpo', 'easeInCirc', 'easeInBack', 'easeInElastic',
                'easeOutQuad', 'easeOutCubic', 'easeOutQuart', 'easeOutQuint', 'easeOutSine', 'easeOutExpo', 'easeOutCirc', 'easeOutBack', 'easeOutElastic',
                'easeInOutQuad', 'easeInOutCubic', 'easeInOutQuart', 'easeInOutQuint', 'easeInOutSine', 'easeInOutExpo', 'easeInOutCirc', 'easeInOutBack', 'easeInOutElastic',
            ],
            default: 'easeInQuad',
        },
        loop: {
            type: 'boolean',
            default: true,
        },
        round: {
            type: 'boolean',
            default: false,
        },
        autoPlay: {
            type: 'boolean',
            default: true,
        },
        enabled: {
            type: 'boolean',
            default: true,
        },
        startEvents: {
            type: 'string',
        },
        pauseEvents: {
            type: 'string',
        },
        resumeEvents: {
            type: 'string',
        },
    },
};

export default animation;
