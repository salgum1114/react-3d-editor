import { IProperties } from '../component';

export interface IBackground {
    color: IProperties;
    transparent: IProperties;
}

const properties: IBackground = {
    color: {
        property: 'color',
        description: 'Color of the scene background.',
        defaultValue: 'black',
    },
    transparent: {
        property: 'transparent',
        description: 'Background is transparent. The color property is ignored.',
        defaultValue: false,
    },
};

export default properties;
