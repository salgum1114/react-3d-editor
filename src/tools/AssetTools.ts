import { Entity } from 'aframe';
import uuid from 'uuid/v4';

import { EventTools } from './';
import { IPrimitive, IEntity, getIcon } from '../constants';
import { IScene } from './InspectorTools';

export const loadAframeAssets = () => {
    let images = [];
    const assetsBaseUrl = 'https://aframe.io/sample-assets/';
    const assetsRelativeUrl = { images: 'dist/images.json' };
    const xhr = new XMLHttpRequest();
    const url = assetsBaseUrl + assetsRelativeUrl.images;

    // @todo Remove the sync call and use a callback
    xhr.open('GET', url);

    xhr.onload = () => {
        const data = JSON.parse(xhr.responseText);
        images = data.images;
        images.forEach((image: any) => {
            image.fullPath = assetsBaseUrl + data.basepath.images + image.path;
            image.fullThumbPath =
            assetsBaseUrl + data.basepath.images_thumbnails + image.thumbnail;
        });
        EventTools.emit('assetsimagesload', images);
    };
    xhr.onerror = () => {
        console.error('Error loading registry file.');
    };
    xhr.send();
};

export const createAsset = (item: IPrimitive, callback?: (...args: any) => void) => {
    const { type, title, attributes } = item;
    const asset = document.createElement(item.type);
    asset.setAttribute('id', `${type}_${uuid()}`)
    asset.setAttribute('title', title);
    if (type !== 'a-mixin') {
        asset.setAttribute('src', '');
    }
    attributes.forEach(attr => {
        if (attr.default) {
            asset.setAttribute(attr.attribute, `${attr.default}`);
        }
    });
    document.getElementsByTagName('a-assets')[0].appendChild(asset);
    EventTools.emit('assetcreate', asset);
    if (callback) {
        callback(asset);
    }
    return asset;
};

export const removeAsset = (asset: Entity) => {
    const assets = document.querySelector('a-assets');
    if (assets.hasChildNodes()) {
        const closest = findClosestAsset(asset);
        assets.removeChild(asset);
        EventTools.emit('assetremove');
        EventTools.emit('assetselect', closest);
    }
};

export const removeSelectedAsset = () => {
    if (AFRAME.INSPECTOR.selectedAsset) {
        removeAsset(AFRAME.INSPECTOR.selectedAsset);
    }
};

export const selectAsset = (asset?: Entity) => {
    EventTools.emit('assetselect', asset);
};

export const findClosestAsset = (asset: Entity) => {
    // First we try to find the after the asset
    const nextAsset = asset.nextElementSibling;
    if (nextAsset) {
        return nextAsset;
    }
    // Otherwise try to find before the asset
    const prevAsset = asset.previousElementSibling;
    if (prevAsset) {
        return prevAsset;
    }
    return null;
}

/**
 * @description Building assets
 * @param {IScene} scene
 * @returns {IEntity[]} assets
 */
export const buildAssets = (scene: IScene, filterTypes?: string[]) => {
    const assets: IEntity[] = [];
    if (scene.firstElementChild.id === 'assets') {
        for (let i = 0; i < scene.firstElementChild.children.length; i++) {
            const en = scene.firstElementChild.children[i] as Entity;
            if (filterTypes && filterTypes.some(type => type === en.tagName.toLowerCase())) {
                continue;
            }
            if (!en.id) {
                en.id = uuid();
            }
            let title;
            if (en.title) {
                title = en.title;
            } else if (en.id) {
                title = en.id;
            } else {
                title = en.tagName.toLowerCase();
            }
            assets.push({
                key: en.id,
                type: en.tagName.toLowerCase(),
                title,
                entity: en,
                icon: getIcon(en.tagName.toLowerCase()),
            });
        }
        return assets;
    }
    return assets;
}