import { IEvents } from '../component';

export interface ITextEvents {
    textfontset: IEvents;
}

export const events: ITextEvents = {
    textfontset: {
        eventName: 'textfontset',
        description: 'Emitted when the font source has been loaded',
    },
}
