import { IValue } from '../component';

export interface IPositionValue {
    x: IValue;
    y: IValue;
    z: IValue;
}

export const value: IPositionValue = {
    x: {
        value: 0,
        description: 'Negative X axis extends left. Positive X Axis extends right.',
    },
    y: {
        value: 0,
        description: 'Negative Y axis extends down. Positive Y Axis extends up.',
    },
    z: {
        value: 0,
        description: 'Negative Z axis extends in. Positive Z Axis extends out.',
    },
}
