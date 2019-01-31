import uuid from 'uuid/v4';
import { Entity } from 'aframe';

import { IAttribute, EntityType } from '../constants/primitives/primitives';
import EventTools from './EventTools';

export const createEntity = (type: EntityType | string, attriubtes: IAttribute[]) => {
    const entity = document.createElement(type);
    entity.setAttribute('id', `${type}_${uuid()}`);
    if (type === 'a-entity') {
        AFRAME.scenes[0].appendChild(entity);
        return entity;
    }
    attriubtes.forEach(attr => {
        entity.setAttribute(attr.attribute, `${attr.defaultValue}`);
    });
    entity.addEventListener('loaded', () => {
        EventTools.emit('entitycreate', entity);
    })
    AFRAME.scenes[0].appendChild(entity);
    return entity;
};

export const updateEntity = (entity: Entity, attribute: string, value: any) => {
    entity.setAttribute(attribute, `${value}`);
};

export const removeEntity = (entity: Entity) => {
    entity.remove();
};

export const cloneEntity = (entity: Entity) => {
    entity.flushToDOM();
    const clonedEntity = entity.cloneNode(true);
    clonedEntity.addEventListener('loaded', () => {
        EventTools.emit('entityclone', clonedEntity);
    });
    return clonedEntity;
}

export const selectEntity = (id: string) => {
    const entity = document.getElementById(id);
    EventTools.emit('entityselect', entity);
    return entity;
}
