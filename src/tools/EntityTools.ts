import uuid from 'uuid/v4';
import { Entity } from 'aframe';

import { IPrimitive, IEntity } from '../constants/primitives/primitives';
import EventTools from './EventTools';
import { IScene } from './InspectorTools';
import { getIcon } from '../constants';

export const createEntity = (primitive: IPrimitive, callback?: (...args: any) => void) => {
    const { type, title, attributes } = primitive;
    console.log(primitive, 'createEntity');
    const entity = document.createElement(type);
    entity.setAttribute('id', `${type}_${uuid()}`);
    entity.setAttribute('title', title);
    entity.addEventListener('loaded', () => {
        EventTools.emit('entitycreate', entity);
        if (callback) {
            callback(entity);
        }
    })
    attributes.forEach(attr => {
        if (attr.default) {
            entity.setAttribute(attr.attribute, `${attr.default}`);
        }
    });
    if (type === 'a-entity') {
        if (AFRAME.INSPECTOR.selectedEntity) {
            AFRAME.INSPECTOR.selectedEntity.appendChild(entity);
        } else {
            AFRAME.scenes[0].appendChild(entity);
        }
        return entity;
    }
    if (AFRAME.INSPECTOR.selectedEntity) {
        AFRAME.INSPECTOR.selectedEntity.appendChild(entity);
    } else {
        AFRAME.scenes[0].appendChild(entity);
    }
    return entity;
};

export const updateEntity = (entity: Entity, propertyName: string, value: any) => {
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
            if (entity.object3D) {
                entity.setAttribute(splitName[0], splitName[1], value);
            } else {
                const attributes = Object.assign({}, entity.getAttribute(splitName[0]), {
                    [splitName[1]]: value,
                });
                const attributesStr = Object.keys(attributes).reduce((prev, attribute) => {
                    return `${prev}${attribute}: ${attributes[attribute]};`;
                }, '');
                const mixins: any[] = [];
                if (entity.tagName.toLowerCase() === 'a-mixin') {
                    Array.from(AFRAME.INSPECTOR.sceneEl.children).forEach(node => {
                        if (node.hasAttribute('mixin') && node.getAttribute('mixin').includes(entity.id)) {
                            const mixin = node.getAttribute('mixin');
                            mixins.push({
                                entity: node,
                                mixin,
                            });
                        }
                    });
                }
                entity.setAttribute(splitName[0], attributesStr);
                if (entity.tagName.toLowerCase() === 'a-mixin') {
                    mixins.forEach(mixin => {
                        mixin.entity.setAttribute('mixin', mixin.mixin);
                    });
                }
            }
        }
    } else {
        if (value === null || value === undefined) {
            // Remove property.
            entity.removeAttribute(propertyName);
        } else {
            // Set property.
            if (entity.object3D) {
                entity.setAttribute(propertyName, value);
            } else {
                const mixins: any[] = [];
                if (entity.tagName.toLowerCase() === 'a-mixin') {
                    Array.from(AFRAME.INSPECTOR.sceneEl.children).forEach(node => {
                        if (node.hasAttribute('mixin') && node.getAttribute('mixin').includes(entity.id)) {
                            const mixin = node.getAttribute('mixin');
                            mixins.push({
                                entity: node,
                                mixin,
                            });
                        }
                    });
                }
                if (propertyName === 'name') {
                    entity.title = value;
                } else {
                    entity.setAttribute(propertyName, value);
                }
                if (entity.tagName.toLowerCase() === 'a-mixin') {
                    mixins.forEach(mixin => {
                        mixin.entity.setAttribute('mixin', mixin.mixin);
                    });
                }
            }
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
    if (entity.tagName.toLowerCase() === 'a-scene') {
        alert('Does not delete Scene.');
        return;
    }
    if (entity.children.length) {
        alert('There are child entities.');
        return;
    }
    const closest = findClosestEntity(entity) as Entity;
    AFRAME.INSPECTOR.removeObject(entity.object3D);
    entity.parentNode.removeChild(entity);
    AFRAME.INSPECTOR.selectEntity(closest);
};

export const cloneSelectedEntity = () => {
    if (AFRAME.INSPECTOR.selectedEntity) {
        cloneEntity(AFRAME.INSPECTOR.selectedEntity);
    }
}

export const removeSelectedEntity = () => {
    if (AFRAME.INSPECTOR.selectedEntity) {
        removeEntity(AFRAME.INSPECTOR.selectedEntity);
    }
}

export const cloneEntity = (entity: Entity, deep?: boolean) => {
    entity.flushToDOM();
    const clonedEntity = entity.cloneNode(deep) as Entity;
    clonedEntity.addEventListener('loaded', () => {
        if (clonedEntity.isPlaying) {
            clonedEntity.pause();
        }
        if (entity.hasAttribute('mixin')) {
            clonedEntity.setAttribute('mixin', entity.getAttribute('mixin'));
        }
        selectEntity(clonedEntity);
        EventTools.emit('entityclone', clonedEntity);
    });
    clonedEntity.setAttribute('scale', AFRAME.components.scale.schema.stringify(entity.object3D.scale));
    clonedEntity.id = `${entity.tagName.toLowerCase()}_${uuid()}`;
    AFRAME.INSPECTOR.sceneEl.appendChild(clonedEntity);
    return clonedEntity;
}

export const selectEntityById = (id: string) => {
    const entity = document.getElementById(id);
    EventTools.emit('entityselect', entity);
    return entity;
}

export const selectEntity = (entity?: Entity) => {
    EventTools.emit('entityselect', entity);
    return entity;
}

export const findClosestEntity = (entity: Entity) => {
    // First we try to find the after the entity
    let nextEntity = entity.nextElementSibling;
    while (nextEntity && (!nextEntity.isEntity || nextEntity.isInspector)) {
        nextEntity = nextEntity.nextElementSibling;
    }
    if (nextEntity && nextEntity.id === 'aframeInspectorMouseCursor') {
        return null;
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
    if (prevEntity && prevEntity.id === 'aframeInspectorMouseCursor') {
        return null;
    }
    // Return if we found it
    if (prevEntity && prevEntity.isEntity && !prevEntity.isInspector) {
        return prevEntity;
    }
    return null;
}

export const addComponent = (entity: Entity, component: string) => {
    const mixins: any[] = [];
    if (entity.tagName.toLowerCase() === 'a-mixin') {
        Array.from(AFRAME.INSPECTOR.sceneEl.children).forEach(node => {
            if (node.hasAttribute('mixin') && node.getAttribute('mixin').includes(entity.id)) {
                const mixin = node.getAttribute('mixin');
                mixins.push({
                    entity: node,
                    mixin,
                });
            }
        });
    }
    entity.setAttribute(component, '');
    if (entity.tagName.toLowerCase() === 'a-mixin') {
        mixins.forEach(mixin => {
            mixin.entity.setAttribute('mixin', mixin.mixin);
        });
    }
    EventTools.emit('componentadd', {
        entity,
        component,
    });
}

export const removeComponent = (entity: Entity, component: string) => {
    const mixins: any[] = [];
    if (entity.tagName.toLowerCase() === 'a-mixin') {
        Array.from(AFRAME.INSPECTOR.sceneEl.children).forEach(node => {
            if (node.hasAttribute('mixin') && node.getAttribute('mixin').includes(entity.id)) {
                const mixin = node.getAttribute('mixin');
                mixins.push({
                    entity: node,
                    mixin,
                });
            }
        });
    }
    entity.removeAttribute(component);
    if (entity.tagName.toLowerCase() === 'a-mixin') {
        mixins.forEach(mixin => {
            mixin.entity.setAttribute('mixin', mixin.mixin);
        });
    }
    EventTools.emit('componentremove', {
        entity,
        component,
    });
}

/**
 * @description Building tree
 * @param {IScene} scene
 * @returns {IEntity[]} treeNodes
 */
export const buildEntities = (scene: IScene) => {
    const treeNodes: IEntity[] = [{
        key: scene.id,
        id: scene.object3D.id,
        type: scene.tagName.toLowerCase(),
        title: scene.object3D.name.length ? scene.object3D.name : scene.title,
        icon: 'eye',
        entity: scene as Entity,
        children: [],
    }];
    const traverseBuildTreeNode = (treeNode: IEntity) => {
        for (let i = 0; i < treeNode.entity.children.length; i++) {
            const en = treeNode.entity.children[i] as Entity;
            if (isInspector(en)) {
                continue;
            }
            if (!en.id) {
                en.id = uuid();
            }
            const { id, name } = en.object3D;
            let title;
            if (name.length) {
                title = name;
            } else if (en.title) {
                title = en.title;
            } else if (en.id) {
                title = en.id;
            } else {
                title = en.tagName;
            }
            en.title = title.toString();
            en.setAttribute('name', title.toString());
            const childTreeNode: IEntity = {
                key: en.id,
                id,
                type: en.tagName.toLowerCase(),
                title,
                icon: getIcon(en.tagName.toLowerCase()),
                entity: en,
                children: [],
                parentKey: treeNode.key,
            };
            treeNode.children.push(childTreeNode);
            if (en.children && en.children.length) {
                traverseBuildTreeNode(childTreeNode);
            }
        }
    }
    traverseBuildTreeNode(treeNodes[0]);
    return treeNodes;
};

export const isInspector = (en: Entity) => {
    return 'isInpsector' in en.dataset
    || 'aframeInspector' in en.dataset
    || !en.isEntity
    || en.isInspector
    || en.hasAttribute('aframe-injected');
}
