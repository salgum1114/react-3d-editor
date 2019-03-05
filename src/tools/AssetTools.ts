import { EventTools } from '.';

const assetsBaseUrl = 'https://aframe.io/sample-assets/';
const assetsRelativeUrl = { images: 'dist/images.json' };

class AssetTools {
    images?: any[];
    hasLoaded?: boolean;

    constructor() {
        this.images = [];
        this.hasLoaded = false;
    }

    load = () => {
        const xhr = new XMLHttpRequest();
        const url = assetsBaseUrl + assetsRelativeUrl['images'];

        // @todo Remove the sync call and use a callback
        xhr.open('GET', url);

        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.images = data.images;
            this.images.forEach(image => {
                image.fullPath = assetsBaseUrl + data.basepath.images + image.path;
                image.fullThumbPath =
                assetsBaseUrl + data.basepath.images_thumbnails + image.thumbnail;
            });
            EventTools.emit('assetsimagesload', this.images);
        };
        xhr.onerror = () => {
            console.error('Error loading registry file.');
        };
        xhr.send();

        this.hasLoaded = true;
    }
}

export default AssetTools;
