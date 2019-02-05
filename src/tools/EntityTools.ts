import uuid from 'uuid/v4';
import { Entity } from 'aframe';

import { IPrimitive } from '../constants/primitives/primitives';
import EventTools from './EventTools';

export const createEntity = (primitive: IPrimitive) => {
    const { type, title, attributes } = primitive;
    const entity = document.createElement(type);
    entity.setAttribute('id', `${type}_${uuid()}`);
    entity.setAttribute('title', title);
    if (type === 'a-entity') {
        AFRAME.scenes[0].appendChild(entity);
        return entity;
    }
    attributes.forEach(attr => {
        if (attr.defaultValue) {
            entity.setAttribute(attr.attribute, `${attr.defaultValue}`);
        }
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

export const removeEntity = (entity: Entity, force: boolean) => {
    const closest = findClosestEntity(entity);
    AFRAME.INSPECTOR.removeObject(entity.object3D);
    entity.remove();
    AFRAME.INSPECTOR.selectEntity(closest);
};

export function removeSelectedEntity(force) {
    if (AFRAME.INSPECTOR.selectedEntity) {
        removeEntity(AFRAME.INSPECTOR.selectedEntity, force);
    }
}

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

export const findClosestEntity = (entity: Entity) => {
    // First we try to find the after the entity
    let nextEntity = entity.nextElementSibling;
    while (nextEntity && (!nextEntity.isEntity || nextEntity.isInspector)) {
        nextEntity = nextEntity.nextElementSibling;
    }
    // Return if we found it
    if (nextEntity && nextEntity.isEntity && !nextEntity.isInspector) {
        return nextEntity;
    }
    // Otherwise try to find before the entity
    let prevEntity = entity.previousElementSibling;
    while (prevEntity && (!prevEntity.isEntity || prevEntity.isInspector)) {
        prevEntity = prevEntity.previousElementSibling;
    }
    // Return if we found it
    if (prevEntity && prevEntity.isEntity && !prevEntity.isInspector) {
        return prevEntity;
    }
    return null;
}