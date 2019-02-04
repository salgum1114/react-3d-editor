import { IValues } from '../components';

export interface IColladModelValues {
    selector: IValues;
    string: IValues;
}

export const values: IColladModelValues = {
    selector: {
        type: 'selection',
        description: 'Selector to an <a-asset-item>',
    },
    string: {
        type: 'string',
        description: 'url()-enclosed path to a COLLADA file',
    },
};
