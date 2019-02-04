import { IEvents } from '../components';

export interface ITextEvents {
    textfontset: IEvents;
}

export const events: ITextEvents = {
    textfontset: {
        eventName: 'textfontset',
        description: 'Emitted when the font source has been loaded',
    },
}
