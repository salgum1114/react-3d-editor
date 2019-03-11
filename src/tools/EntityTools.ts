import uuid from 'uuid/v4';
import { Entity } from 'aframe';

import { IPrimitive } from '../constants/primitives/primitives';
import EventTools from './EventTools';

export const createEntity = (primitive: IPrimitive, callback?: (...args: any) => void) => {
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
        if (callback) {
            callback(entity);
        }
    })
    AFRAME.scenes[0].appendChild(entity);
    return entity;
};

export const updateEntity = (entity: Entity, propertyName: string, value: any) => {
    console.log(entity, propertyName, value);
    let splitName;
    if (propertyName.indexOf('.') !== -1) {
        // Multi-prop
        splitName = propertyName.split('.');
        if (value === null || value === undefined) {
            // Remove property.
            const parameters = entity.getAttribute(splitName[0]);
            delete parameters[splitName[1]];
            entity.setAttribute(splitName[0], parameters);
        } else {
            // Set property.
            entity.setAttribute(splitName[0], splitName[1], value);
        }
    } else {
        if (value === null || value === undefined) {
            // Remove property.
            entity.removeAttribute(propertyName);
        } else {
            // Set property.
            entity.setAttribute(propertyName, value);
        }
    }
    EventTools.emit('entityupdate', {
        component: splitName ? splitName[0] : propertyName,
        entity,
        property: splitName ? splitName[1] : '',
        value,
    });
};

export const removeEntity = (entity: Entity) => {
    const closest = findClosestEntity(entity) as Entity;
    AFRAME.INSPECTOR.removeObject(entity.object3D);
    entity.parentNode.removeChild(entity);
    AFRAME.INSPECTOR.selectEntity(closest);
};

export function cloneSelectedEntity() {
    if (AFRAME.INSPECTOR.selectedEntity) {
        cloneEntity(AFRAME.INSPECTOR.selectedEntity);
    }
}

export function removeSelectedEntity() {
    if (AFRAME.INSPECTOR.selectedEntity) {
        removeEntity(AFRAME.INSPECTOR.selectedEntity);
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