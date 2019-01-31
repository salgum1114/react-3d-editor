import { IEvents } from '../component';

export interface IColladaModelEvents {
    modelLoaded: IEvents;
}

export const events: IColladaModelEvents = {
    modelLoaded: {
        eventName: 'model-loaded',
        description: 'COLLADA model has been loaded into the scene.',
    },
};
