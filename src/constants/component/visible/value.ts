import { IValue } from '../component';

export interface IVisibleValue {
    true: IValue;
    false: IValue;
}

export const value: IVisibleValue = {
    true: {
        value: true,
        description: 'The entity will be rendered and visible; the default value.',
    },
    false: {
        value: false,
        description: 'The entity will not be rendered nor visible. The entity will still exist in the scene.',
    },
}
