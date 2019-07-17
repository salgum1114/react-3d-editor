import { Entity } from 'aframe';

import { EventTools } from './';
import { AssetType } from '../constants';

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

export const createAsset = (type: AssetType, callback?: (...args: any) => void) => {
    const asset = document.createElement(type);
    document.getElementsByTagName('a-assets')[0].appendChild(asset);
    asset.addEventListener('loaded', () => {
        EventTools.emit('assetcreate', asset);
        if (callback) {
            callback(asset);
        }
    });
    return asset;
};

export const updateAsset = () => {

};

export const removeAsset = (asset: Entity) => {
    const assets = document.getElementsByTagName('a-assets')[0];
    if (assets.hasChildNodes()) {
        asset.parentNode.removeChild(asset);
        EventTools.emit('assetremove');
    }
};

export const removeSelectedAsset = () => {
    if (AFRAME.INSPECTOR.selectedAsset) {
        removeAsset(AFRAME.INSPECTOR.selectedAsset);
    }
};

export const selectAsset = (asset: Entity) => {
    EventTools.emit('assetselect', asset);
};
