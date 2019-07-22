import AssetItem from './a-asset-item';
import Audio from './audio';
import Image from './img';
import Video from './video';
import { Record } from '../../types/utils';

const AssetSchema: Record = {
    'a-asset-item': AssetItem,
    'audio': Audio,
    'img': Image,
    'video': Video,
};

export default AssetSchema;
