import { IInspector } from '../components/inspector/Inspector';
import EventTools from './EventTools';
import { KeyMapper } from '../types/utils';

export type DirectionType = 'left'
| 'right'
| 'top'
| 'bottom'
| 'back'
| 'front'
| string
;

// Save ortho camera FOV / position before switching to restore later.
let currentOrthoDir = '';
const orthoCameraMemory: KeyMapper = {
    left: {
        position: new AFRAME.THREE.Vector3(-10, 0, 0), rotation: new AFRAME.THREE.Euler(),
    },
    right: {
        position: new AFRAME.THREE.Vector3(10, 0, 0), rotation: new AFRAME.THREE.Euler(),
    },
    top: {
        position: new AFRAME.THREE.Vector3(0, 10, 0), rotation: new AFRAME.THREE.Euler(),
    },
    bottom: {
        position: new AFRAME.THREE.Vector3(0, -10, 0), rotation: new AFRAME.THREE.Euler(),
    },
    back: {
        position: new AFRAME.THREE.Vector3(0, 0, -10), rotation: new AFRAME.THREE.Euler(),
    },
    front: {
        position: new AFRAME.THREE.Vector3(0, 0, 10), rotation: new AFRAME.THREE.Euler(),
    },
};

class CameraTools {
    constructor(inspector: IInspector) {
        this.init(inspector);
    }

    init(inspector: IInspector) {
        const sceneEl = inspector.sceneEl;
        const originalCamera = inspector.currentCameraEl = sceneEl.camera.el;
        inspector.currentCameraEl.setAttribute(
            'data-aframe-inspector-original-camera',
            '',
        );

        // If the current camera is the default, we should prevent AFRAME from
        // remove it once when we inject the editor's camera.
        if (inspector.currentCameraEl.hasAttribute('data-aframe-default-camera')) {
            inspector.currentCameraEl.removeAttribute('data-aframe-default-camera');
            inspector.currentCameraEl.setAttribute(
                'data-aframe-inspector',
                'default-camera',
            );
        }

        inspector.currentCameraEl.setAttribute('camera', 'active', false);

        // Create Inspector camera.
        const perspectiveCamera = inspector.camera = new AFRAME.THREE.PerspectiveCamera();
        perspectiveCamera.far = 10000;
        perspectiveCamera.near = 0.01;
        perspectiveCamera.position.set(0, 1.6, 2);
        perspectiveCamera.lookAt(new AFRAME.THREE.Vector3(0, 1.6, -1));
        perspectiveCamera.updateMatrixWorld(false);
        sceneEl.object3D.add(perspectiveCamera);
        sceneEl.camera = perspectiveCamera;

        const ratio = sceneEl.canvas.width / sceneEl.canvas.height;
        const orthoCamera = new AFRAME.THREE.OrthographicCamera(-10 * ratio, 10 * ratio, 10, -10);
        sceneEl.object3D.add(orthoCamera);

        const cameras = inspector.cameras = {
            perspective: perspectiveCamera,
            original: originalCamera,
            ortho: orthoCamera,
        };

        // Command to switch to perspective.
        EventTools.on('cameraperspectivetoggle', () => {
            this.saveOrthoCamera(inspector.camera as THREE.PerspectiveCamera, currentOrthoDir);
            sceneEl.camera = inspector.camera = cameras.perspective;
            EventTools.emit('cameratoggle', { camera: inspector.camera, value: 'perspective' });
        });

        // Command to switch to ortographic.
        EventTools.on('cameraorthographictoggle', (dir: DirectionType) => {
            this.saveOrthoCamera(inspector.camera as THREE.OrthographicCamera, currentOrthoDir);
            sceneEl.camera = inspector.camera = cameras.ortho;
            currentOrthoDir = dir;
            this.setOrthoCamera(cameras.ortho, dir, ratio);

            // Set initial rotation for the respective orthographic camera.
            if (cameras.ortho.rotation.x === 0
            && cameras.ortho.rotation.y === 0
            && cameras.ortho.rotation.z === 0) {
                cameras.ortho.lookAt(0, 0, 0);
            }
            EventTools.emit('cameratoggle', { camera: inspector.camera, value: `ortho${dir}` });
        });

        return inspector.cameras;
    }

    saveOrthoCamera = (camera: THREE.Camera, dir: DirectionType) => {
        if (camera.type !== 'OrthographicCamera') {
            return;
        }
        const orthoCamera = camera as THREE.OrthographicCamera;
        const info = orthoCameraMemory[dir];
        info.position.copy(orthoCamera.position);
        info.rotation.copy(orthoCamera.rotation);
        info.left = orthoCamera.left;
        info.right = orthoCamera.right;
        info.top = orthoCamera.top;
        info.bottom = orthoCamera.bottom;
    }

    setOrthoCamera = (camera: THREE.OrthographicCamera, dir: DirectionType, ratio: number) => {
        const info = orthoCameraMemory[dir];
        camera.left = info.left || (-10 * ratio);
        camera.right = info.right || (10 * ratio);
        camera.top = info.top || 10;
        camera.bottom = info.bottom || -10;
        camera.position.copy(info.position);
        camera.rotation.copy(info.rotation);
    }
}

export default CameraTools;
