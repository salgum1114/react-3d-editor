import geometry from './geometry';
import image from './image';
import material from './material';
import name from './name';
import audio from './audio';
import video from './video';
import file from './file';
import scale from './scale';
import color from './color';
import background from './background';
import camera from './camera';
import cursor from './cursor';
import daydreamControls from './daydream-controls';

const AssetComponents = {
    geometry,
    image,
    material,
    name,
    video,
    audio,
    file,
    scale,
    color,
    'daydream-controls': daydreamControls,
};

export default AssetComponents;
