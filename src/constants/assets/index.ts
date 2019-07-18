import AssetItem from './a-asset-item';
import Mixin from './a-mixin';
import Audio from './audio';
import Image from './img';
import Video from './video';

const AssetSchema = {
    'a-asset-item': AssetItem,
    'a-mixin': Mixin,
    'audio': Audio,
    'img': Image,
    'video': Video,
};

export default AssetSchema;
