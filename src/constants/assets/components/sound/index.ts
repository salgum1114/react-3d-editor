import { IComponentDescriptor, SoundDistanceModel } from '../components';

const sound: IComponentDescriptor = {
    isSingleProp: false,
    multiple: true,
    name: 'sound',
    schema: {
        autoplay: {
            type: 'boolean',
            default: false,
        },
        distanceModel: {
            type: 'string',
            default: 'inverse',
            oneOf: SoundDistanceModel,
        },
        loop: {
            type: 'boolean',
            default: false,
        },
        maxDistance: {
            type: 'number',
            default: 10000,
        },
        on: {
            type: 'string',
        },
        poolSize: {
            type: 'number',
            default: 1,
        },
        positional: {
            type: 'boolean',
            default: true,
        },
        refDistance: {
            type: 'number',
            default: 1,
        },
        rolloffFactor: {
            type: 'number',
            default: 1,
        },
        src: {
            type: 'audio',
        },
        volume: {
            type: 'number',
            default: 1,
        },
    },
};

export default sound;
