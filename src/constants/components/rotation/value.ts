import { IValue } from '../components';

export interface IRotationValue {
    x: IValue;
    y: IValue;
    z: IValue;
}

export const value: IRotationValue = {
    x: {
        value: 0,
        description: 'Pitch, rotation about the X-axis.',
    },
    y: {
        value: 0,
        description: 'Yaw, rotation about the Y-axis.',
    },
    z: {
        value: 0,
        description: 'Roll, rotation about the Z-axis.',
    },
}
