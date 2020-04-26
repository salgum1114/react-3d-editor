import geometry from './geometry';
import image from './image';
import material from './material';
import name from './name';
import audio from './audio';
import video from './video';
import file from './file';
import scale from './scale';
import background from './background';
import camera from './camera';
import cursor from './cursor';
import daydreamControls from './daydream-controls';
import animation from './animation';
import debug from './debug';
import embedded from './embedded';
import gearvrControls from './gearvr-controls';
import gltfModel from './gltf-model';
import handControls from './hand-controls';
import fog from './fog';
import keyboardShortcuts from './keyboard-shortcuts';
import laserControls from './laser-controls';
import light from './light';
import line from './line';
import link from './link';
import loadingScreen from './loading-screen';
import lookControls from './look-controls';
import objModel from './obj-model';
import oculusGoControls from './oculus-go-controls';
import oculusTouchControls from './oculus-touch-controls';
import pivot from './pivot';
import pool from './pool';
import position from './position';
import raycaster from './raycaster';
import rotation from './rotation';
import screenshot from './screenshot';
import shadow from './shadow';
import sound from './sound';
import stats from './stats';
import text from './text';
import trackedControls from './tracked-controls';
import trackedControlsWebvr from './tracked-controls-webvr';
import trackedControlsWebxr from './tracked-controls-webxr';
import visible from './visible';
import viveControls from './vive-controls';
import viveFocusControls from './vive-focus-controls';
import vrModeUi from './vr-mode-ui';
import wasdControls from './wasd-controls';
import windowsMotionControls from './windows-motion-controls';
import { ComponentNames, IComponentDescriptor } from '../../../models/component';

const AssetComponents: Record<ComponentNames, IComponentDescriptor> = {
	geometry,
	image,
	material,
	name,
	video,
	audio,
	file,
	scale,
	'daydream-controls': daydreamControls,
	background,
	camera,
	cursor,
	animation,
	debug,
	embedded,
	'gearvr-controls': gearvrControls,
	'gltf-model': gltfModel,
	'hand-controls': handControls,
	fog,
	'keyboard-shortcuts': keyboardShortcuts,
	'laser-controls': laserControls,
	light,
	line,
	link,
	'loading-screen': loadingScreen,
	'look-controls': lookControls,
	'obj-model': objModel,
	'oculus-go-controls': oculusGoControls,
	'oculus-touch-controls': oculusTouchControls,
	pivot,
	pool,
	position,
	raycaster,
	rotation,
	screenshot,
	shadow,
	sound,
	stats,
	text,
	'tracked-controls': trackedControls,
	'tracked-controls-webvr': trackedControlsWebvr,
	'tracked-controls-webxr': trackedControlsWebxr,
	visible,
	'vive-controls': viveControls,
	'vive-focus-controls': viveFocusControls,
	'vr-mode-ui': vrModeUi,
	'wasd-controls': wasdControls,
	'windows-motion-controls': windowsMotionControls,
};

export default AssetComponents;
