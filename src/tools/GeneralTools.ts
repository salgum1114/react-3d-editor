import uuid from 'uuid/v4';

import { PrimitiveType, IAttribute } from '../constants/primitives';

export const createElement = (type: PrimitiveType, attriubtes: IAttribute[]) => {
    if (type === 'a-entity') {

    }
    const element = document.createElement(type);
    element.setAttribute('id', `${type}_${uuid()}`);
    attriubtes.forEach(attr => {
        element.setAttribute(attr.attribute, `${attr.defaultValue}`);
    });
};
