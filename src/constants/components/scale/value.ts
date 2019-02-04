import { IValue } from '../components';

export interface IScaleValue {
    x: IValue;
    y: IValue;
    z: IValue;
}

export const value: IScaleValue = {
    x: {
        value: 1,
        description: 'Scaling factor in the X direction.',
    },
    y: {
        value: 1,
        description: 'Scaling factor in the Y direction.',
    },
    z: {
        value: 1,
        description: 'Scaling factor in the Z direction.',
    },
}
