import uuid from 'uuid/v4';
import { Entity, Schema, Component } from 'aframe';

import { IPrimitive, IEntity } from '../constants/primitives/primitives';
import EventTools from './EventTools';
import { IScene } from './InspectorTools';
import { getIcon } from '../constants';
import { Record } from '../types/utils';
import { UtilTools } from '.';

export const createEntity = (primitive: IPrimitive, callback?: (...args: any) => void) => {
    const { type, title, attributes, fragment } = primitive;
    if (fragment && fragment.asset) {
        AFRAME.INSPECTOR.sceneEl.querySelector('a-assets').appendChild(createFragment(fragment.entity));
    }
    if (fragment && fragment.entity) {
        const createdFragment = createFragment(fragment.entity);
        const firstChild = createdFragment.firstChild as Entity;
        firstChild.addEventListener('loaded', () => {
            if (firstChild.isPlaying) {
                firstChild.pause();
            }
            EventTools.emit('entitycreate', firstChild);
            if (callback) {
                callback(firstChild);
            }
        });
        AFRAME.INSPECTOR.sceneEl.appendChild(createdFragment);
        return firstChild;
    }
    const entity = document.createElement(type);
    entity.setAttribute('id', `${type}_${uuid()}`);
    entity.setAttribute('title', title);
    entity.addEventListener('loaded', () => {
        if (entity.isPlaying) {
            entity.pause();
        }
        EventTools.emit('entitycreate', entity);
        if (callback) {
            callback(entity);
        }
    })
    if (attributes) {
        attributes.forEach(attr => {
            if (attr.default) {
                let splitName;
                if (attr.attribute.indexOf('.') !== -1) {
                    splitName = attr.attribute.split('.');
                    entity.setAttribute(splitName[0], splitName[1], attr.default);
                } else {
                    entity.setAttribute(attr.attribute, attr.default);
                }
            }
        });
    }
    if (type === 'a-entity') {
        if (AFRAME.INSPECTOR.selectedEntity) {
            AFRAME.INSPECTOR.selectedEntity.appendChild(entity);
        } else {
            AFRAME.INSPECTOR.sceneEl.appendChild(entity);
        }
        return entity;
    }
    if (AFRAME.INSPECTOR.selectedEntity) {
        AFRAME.INSPECTOR.selectedEntity.appendChild(entity);
    } else {
        AFRAME.INSPECTOR.sceneEl.appendChild(entity);
    }
    return entity;
};

export const createFragment = (fragment: string) => {
    return document.createRange().createContextualFragment(fragment.trim());
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
    const closest = findClosestEntity(entity) as Entity;
    AFRAME.INSPECTOR.removeObject(entity.object3D);
    entity.parentNode.removeChild(entity);
    AFRAME.INSPECTOR.selectEntity(closest);
};

export const cloneSelectedEntity = () => {
    if (AFRAME.INSPECTOR.selectedEntity
    && AFRAME.INSPECTOR.selectedEntity.tagName.toLowerCase() !== 'a-scene') {
        cloneEntity(AFRAME.INSPECTOR.selectedEntity);
    }
}

export const removeSelectedEntity = () => {
    if (AFRAME.INSPECTOR.selectedEntity
    && AFRAME.INSPECTOR.selectedEntity.tagName.toLowerCase() !== 'a-scene') {
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
    const setAttribute = HTMLElement.prototype.setAttribute;
    setAttribute.call(clonedEntity, 'scale', AFRAME.utils.coordinates.stringify(entity.object3D.scale));
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
            } else if (en.hasAttribute('orbit-controls')) {
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
    || 'aframeInspectorOriginalCamera' in en.dataset
    || !en.isEntity
    || en.isInspector
    || en.hasAttribute('aframe-injected');
};

/**
 * Return the clipboard representation to be used to copy to the clipboard
 * @param  {Entity} entity Entity to copy to clipboard
 * @return {string} Entity clipboard representation
 */
export function getEntityClipboardRepresentation(entity: Entity, ar?: boolean) {
    const clone = prepareForSerialization(entity, ar) as Entity;
    if (ar) {
        clone.setAttribute('arjs', 'sourceType: webcam; debugUIEnabled: true; trackingMethod: best; patternRatio: 0.75;');
        clone.appendChild(document.createRange().createContextualFragment('<a-camera-static />'));
    }
    return clone.outerHTML;
};

/**
 * Returns a copy of the DOM hierarchy prepared for serialization.
 * The process optimises component representation to avoid values coming from
 * primitive attributes, mixins and defaults.
 *
 * @param {Entity} entity Root of the DOM hierarchy.
 * @return {Entity} Copy of the DOM hierarchy ready for serialization.
 */
const prepareForSerialization = (entity: Entity, ar?: boolean): Entity => {
    const clone = entity.cloneNode(false) as Entity;
    const children = entity.childNodes;
    for (let i = 0, l = children.length; i < l; i++) {
        const child = children[i] as HTMLElement;
        if (ar) {
            if (child.hasAttribute && child.hasAttribute('camera')) {
                continue;
            }
        }
        if (
            child.nodeType !== Node.ELEMENT_NODE ||
            (!child.hasAttribute('aframe-injected') &&
            !child.hasAttribute('data-aframe-inspector') &&
            !child.hasAttribute('data-aframe-canvas'))
        ) {
            clone.appendChild(prepareForSerialization(child as Entity));
        }
    }
    optimizeComponents(clone, entity);
    return clone;
};

/**
 * Removes from copy those components or components' properties that comes from
 * primitive attributes, mixins, injected default components or schema defaults.
 *
 * @param {Entity} copy   Destinatary element for the optimization.
 * @param {Entity} source Element to be optimized.
 */
const optimizeComponents = (copy: Entity, source: Entity) => {
    const removeAttribute = HTMLElement.prototype.removeAttribute;
    const setAttribute = HTMLElement.prototype.setAttribute;
    const components = source.components || {};
    Object.keys(components).forEach(name => {
        const component = components[name];
        const result = getImplicitValue(component, source);
        const isInherited = result[1];
        const implicitValue = result[0];
        const currentValue = source.getAttribute(name);
        const optimalUpdate = getOptimalUpdate(
            component,
            implicitValue,
            currentValue,
        );
        const doesNotNeedUpdate = optimalUpdate === null;
        if (isInherited && doesNotNeedUpdate) {
            removeAttribute.call(copy, name);
        } else {
            const schema = component.schema;
            const value = stringifyComponentValue(schema, optimalUpdate);
            setAttribute.call(copy, name, value);
        }
    });
    if (source.object3D && source.tagName.toLowerCase() !== 'a-scene') {
        const { position, rotation, scale } = source.object3D;
        if (position) {
            setAttribute.call(copy, 'position', AFRAME.utils.coordinates.stringify(position));
        }
        if (rotation) {
            setAttribute.call(copy, 'rotation', AFRAME.utils.coordinates.stringify(rotation));
        }
        if (scale) {
            setAttribute.call(copy, 'scale', AFRAME.utils.coordinates.stringify(scale));
        }
    }
};

/**
 * @param  {Schema} schema The component schema.
 * @param  {any}    data   The component value.
 * @return {string}        The string representation of data according to the
 *                         passed component's schema.
 */
const stringifyComponentValue = (schema: Schema<any>, data: any) => {
    const single = () => {
        return schema.stringify(data);
    }
    const multi = () => {
        const propertyBag = {} as Record;
        Object.keys(data).forEach((name: string) => {
            if (schema[name]) {
                propertyBag[name] = schema[name].stringify(data[name]);
            }
        });
        return AFRAME.utils.styleParser.stringify(propertyBag);
    }
    data = typeof data === 'undefined' ? {} : data;
    if (data === null) {
        return '';
    }
    return (isSingleProperty(schema) ? single : multi)();
};

/**
 * Computes the value for a component coming from primitive attributes,
 * mixins, primitive defaults, a-frame default components and schema defaults.
 * In this specific order.
 *
 * In other words, it is the value of the component if the author would have not
 * overridden it explicitly.
 *
 * @param {Component} component Component to calculate the value of.
 * @param {Entity}   source    Element owning the component.
 * @return                      A pair with the computed value for the component of source and a flag indicating if the component is completely inherited from other sources (`true`) or genuinely owned by the source entity (`false`).
 */
const getImplicitValue = (component: Component, source: Entity) => {
    let isInherited = false;
    const single = () => {
        let value = getMixedValue(component, null, source);
        if (value === undefined) {
            value = getInjectedValue(component, null, source);
        }
        if (value !== undefined) {
            isInherited = true;
        } else {
            value = getDefaultValue(component, null, source);
        }
        if (value !== undefined) {
            // XXX: This assumes parse is idempotent
            return component.schema.parse(value);
        }
        return value;
    }
    const multi = () => {
        let value = {} as Record;
        Object.keys(component.schema).forEach(propertyName => {
            let propertyValue = getFromAttribute(component, propertyName, source);
            if (propertyValue === undefined) {
                propertyValue = getMixedValue(component, propertyName, source);
            }
            if (propertyValue === undefined) {
                propertyValue = getInjectedValue(component, propertyName, source);
            }
            if (propertyValue !== undefined) {
                isInherited = isInherited || true;
            } else {
                propertyValue = getDefaultValue(component, propertyName, source);
            }
            if (propertyValue !== undefined) {
                const { parse } = component.schema[propertyName];
                value = value || {};
                // XXX: This assumes parse is idempotent
                value[propertyName] = parse(propertyValue);
            }
        });
        return value;
    }
    const value = (isSingleProperty(component.schema) ? single : multi)();
    return [value, isInherited];
};

/**
 * Gets the value for the component's property coming from a primitive
 * attribute.
 *
 * Primitives have mappings from attributes to component's properties.
 * The function looks for a present attribute in the source element which
 * maps to the specified component's property.
 *
 * @param  {Component} component    Component to be found.
 * @param  {string}    propertyName Component's property to be found.
 * @param  {Entity}   source       Element owning the component.
 * @return {any}                    The value of the component's property coming
 *                                  from the primitive's attribute if any or
 *                                  `undefined`, otherwise.
 */
const getFromAttribute = (component: Component, propertyName: string, source: Entity) => {
    let value;
    const mappings = source.mappings || {};
    const route = component.name + '.' + propertyName;
    const findAttribute = (mappings: any, route: string) => {
        const attributes = Object.keys(mappings);
        for (let i = 0, l = attributes.length; i < l; i++) {
            const attribute = attributes[i];
            if (mappings[attribute] === route) {
                return attribute;
            }
        }
        return undefined;
    }
    const primitiveAttribute = findAttribute(mappings, route);
    if (primitiveAttribute && source.hasAttribute(primitiveAttribute)) {
        value = source.getAttribute(primitiveAttribute);
    }
    return value;
}

/**
 * Gets the value for a component or component's property coming from mixins of
 * an element.
 *
 * If the component or component's property is not provided by mixins, the
 * functions will return `undefined`.
 *
 * @param {Component} component      Component to be found.
 * @param {string}    [propertyName] If provided, component's property to be
 *                                   found.
 * @param {Entity}   source         Element owning the component.
 * @return                           The value of the component or components'
 *                                   property coming from mixins of the source.
 */
const getMixedValue = (component: Component, propertyName: string, source: Entity) => {
    let value;
    const reversedMixins = source.mixinEls.reverse();
    for (let i = 0; value === undefined && i < reversedMixins.length; i++) {
        const mixin = reversedMixins[i];
        if (mixin.attributes.hasOwnProperty(component.name)) {
            if (!propertyName) {
                value = mixin.getAttribute(component.name);
            } else {
                value = mixin.getAttribute(component.name)[propertyName];
            }
        }
    }
    return value;
}

/**
 * Gets the value for a component or component's property coming from primitive
 * defaults or a-frame defaults. In this specific order.
 *
 * @param {Component} component      Component to be found.
 * @param {string}    [propertyName] If provided, component's property to be
 *                                   found.
 * @param {Entity}   source         Element owning the component.
 * @return                           The component value coming from the
 *                                   injected default components of source.
 */
const getInjectedValue = (component: Component, propertyName: string, source: Entity) => {
    let value;
    const primitiveDefaults = source.defaultComponentsFromPrimitive || {};
    const aFrameDefaults = source.defaultComponents || {};
    const defaultSources = [primitiveDefaults, aFrameDefaults];
    for (let i = 0; value === undefined && i < defaultSources.length; i++) {
        const defaults = defaultSources[i];
        if (defaults.hasOwnProperty(component.name)) {
            if (!propertyName) {
                value = defaults[component.name];
            } else {
                value = defaults[component.name][propertyName];
            }
        }
    }
    return value;
}

/**
 * Gets the value for a component or component's property coming from schema
 * defaults.
 *
 * @param {Component} component      Component to be found.
 * @param {string}    [propertyName] If provided, component's property to be
 *                                   found.
 * @param {Entity}   source         Element owning the component.
 * @return                           The component value coming from the schema
 *                                   default.
 */
const getDefaultValue = (component: Component, propertyName: string, source: Entity) => {
    if (!propertyName) {
        return component.schema.default;
    }
    return component.schema[propertyName].default;
}

/**
 * Returns the minimum value for a component with an implicit value to equal a
 * reference value. A `null` optimal value means that there is no need for an
 * update since the implicit value and the reference are equal.
 *
 * @param {Component} component Component of the computed value.
 * @param {any}       implicit  The implicit value of the component.
 * @param {any}       reference The reference value for the component.
 * @return                      the minimum value making the component to equal
 *                              the reference value.
 */
const getOptimalUpdate = (component: Component, implicit: any, reference: any) => {
    if (UtilTools.equal(implicit, reference)) {
        return null;
    }
    if (isSingleProperty(component.schema)) {
        return reference;
    }
    const optimal = {} as Record;
    Object.keys(reference).forEach(key => {
        // const needsUpdate = !UtilTools.equal(reference[key], implicit[key]);
        // if (needsUpdate) {
        if (reference[key]
            && (key === 'src'
            || key === 'mtl'
            || key === 'obj')) {
            let optimalValue = reference[key];
            if (optimalValue instanceof HTMLElement) {
                optimalValue = reference[key].getAttribute(key);
            }
            optimal[key] = `url(${optimalValue})`;
        } else {
            optimal[key] = reference[key];
        }
        // }
    });
    return optimal;
}

/**
 * @param {Schema} schema   Component's schema to test if it is single property.
 * @return {boolean}        if component is single property.
 */
const isSingleProperty = (schema: Schema) => {
    return AFRAME.schema.isSingleProperty(schema);
}

/**
 * Detect element's Id collision and returns a valid one
 * @param  {string} baseId Proposed Id
 * @return {string}        Valid Id based on the proposed Id
 */
const getUniqueId = (baseId: string) => {
    if (!document.getElementById(baseId)) {
        return baseId;
    }
    let i = 2;
    // If the baseId ends with _#, it extracts the baseId removing the suffix
    const groups = baseId.match(/(\w+)-(\d+)/);
    if (groups) {
        baseId = groups[1];
        i = groups[2];
    }
    while (document.getElementById(baseId + '-' + i)) {
        i++;
    }
    return baseId + '-' + i;
};

export const exportToGLTF = (entity: Entity) => {
    const { object3D, id, title } = entity;
    const name = title || id;
    filterHelpers(object3D, false);
    AFRAME.INSPECTOR.exporters.gltf.parse(
        object3D,
        (buffer: BlobPart) => {
            filterHelpers(object3D, true);
            const blob = new Blob([buffer], { type: 'application/octet-stream' });
            UtilTools.saveBlob(blob, name + '.gltf');
        },
        { binary: true },
    );
}

const filterHelpers = (object3D: THREE.Object3D, visible: boolean) => {
    object3D.traverse(o => {
        if (o.userData.source === 'INSPECTOR') {
            o.visible = visible;
        }
    });
};
