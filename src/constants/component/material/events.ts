import { IEvents } from '../component';

export interface IMaterialEvents {
    materialtextureloaded: IEvents;
    materialvideoloadeddata: IEvents;
    materialvideoended: IEvents;
}

export const events: IMaterialEvents = {
    materialtextureloaded: {
        eventName: 'materialtextureloaded',
        description: 'Texture loaded onto material.',
    },
    materialvideoloadeddata: {
        eventName: 'materialvideoloadeddata',
        description: 'Video data loaded and is going to play.',
    },
    materialvideoended: {
        eventName: 'materialvideoended',
        description: 'For video textures, emitted when the video has reached its end (may not work with loop).',
    },
}
