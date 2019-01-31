import uuid from 'uuid/v4';

import { IAttribute, ElementType } from '../constants/primitives/primitives';

export const createElement = (type: ElementType, attriubtes: IAttribute[]) => {
    const element = document.createElement(type);
    element.setAttribute('id', `${type}_${uuid()}`);
    if (type === 'a-entity') {
        return element;
    }
    attriubtes.forEach(attr => {
        element.setAttribute(attr.attribute, `${attr.defaultValue}`);
    });
    return element;
};

export const setAttributeById = (element: HTMLElement, attribute: string, value: any) => {
    element.setAttribute(attribute, `${value}`);
};
