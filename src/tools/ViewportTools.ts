import EventTools from './EventTools';

import '../lib/TransformControls';
import '../lib/EditorControls';
import { IRaycaster } from './RaycasterTools';
import { RaycasterTools, InspectorTools } from '.';
import { ICamera } from './InspectorTools';

class ViewportTools {
    selectionBox?: THREE.BoxHelper;
    transformControls?: THREE.TransformControls;
    controls?: THREE.EditorControls;
    grid?: THREE.GridHelper;
    mouseCursor?: IRaycaster;

    /**
     * Creates an instance of ViewportTools.
     * @param {InspectorTools} inspector
     * @memberof ViewportTools
     */
    constructor(inspector: InspectorTools) {
        this.init(inspector);
    }

    /**
     * Viewport init
     *
     * @param {InspectorTools} inspector
     * @memberof ViewportTools
     */
    init(inspector: InspectorTools) {
        const sceneEl = inspector.sceneEl;
        let originalCamera = inspector.cameras.original;
        sceneEl.addEventListener('camera-set-active', event => {
            // If we're in edit mode, save the newly active camera and activate when exiting.
            if (inspector.opened) {
                originalCamera = event.detail.cameraEl;
            }
        });
        this.initRaycaster(inspector);
        // Helpers.
        this.initGrid(inspector);
        this.initSelectionBox(inspector);
        this.initTransformControls(inspector);
        this.initControls(inspector);
        this.initEvents(inspector);
    }

    /**
     *
     *
     * @param {InspectorTools} inspector
     * @memberof ViewportTools
     */
    initRaycaster(inspector: InspectorTools) {
        const raycasterTools = new RaycasterTools(inspector);
        this.mouseCursor = raycasterTools.init(inspector);
    }

    /**
     *
     *
     * @param {InspectorTools} inspector
     * @memberof ViewportTools
     */
    initGrid(inspector: InspectorTools) {
        const sceneHelpers = inspector.sceneHelpers;
        const grid = new AFRAME.THREE.GridHelper(30, 60, 0xaaaaaa, 0x262626);
        sceneHelpers.add(grid);
        this.grid = grid;
    }

    /**
     *
     *
     * @param {InspectorTools} inspector
     * @memberof ViewportTools
     */
    initSelectionBox(inspector: InspectorTools) {
        const sceneHelpers = inspector.sceneHelpers;
        this.selectionBox = new AFRAME.THREE.BoxHelper();
        this.selectionBox.material.depthTest = false;
        this.selectionBox.material.transparent = true;
        this.selectionBox.material.color.set(0x1faaf2);
        this.selectionBox.visible = false;
        sceneHelpers.add(this.selectionBox);
    }

    /**
     *
     *
     * @param {InspectorTools} inspector
     * @memberof ViewportTools
     */
    initTransformControls(inspector: InspectorTools) {
        const sceneHelpers = inspector.sceneHelpers;
        const camera = inspector.camera;
        const transformControls = new AFRAME.THREE.TransformControls(
            camera,
            inspector.container,
        );
        transformControls.size = 0.75;
        transformControls.addEventListener('objectChange', evt => {
            const object = transformControls.object;
            if (object === undefined) {
                return;
            }
            this.selectionBox.setFromObject(object).update();
            this.updateHelpers(inspector, object);
            EventTools.emit('refreshsidebarobject3d', object);
            // Emit update event for watcher.
            let component;
            let value;
            if (evt.mode === 'translate') {
                component = 'position';
                value = `${object.position.x} ${object.position.y} ${object.position.z}`;
            } else if (evt.mode === 'rotate') {
                component = 'rotation';
                const d = AFRAME.THREE.Math.radToDeg;
                value = `${d(object.rotation.x)} ${d(object.rotation.y)} ${d(object.rotation.z)}`;
            } else if (evt.mode === 'scale') {
                component = 'scale';
                value = `${object.scale.x} ${object.scale.y} ${object.scale.z}`;
            }
            EventTools.emit('entityupdate', {
                component,
                entity: transformControls.object.el,
                property: '',
                value,
            });
            EventTools.emit('entitytransformed', transformControls.object.el);
        });
        transformControls.addEventListener('mouseDown', () => {
            this.controls.enabled = false;
        });
        transformControls.addEventListener('mouseUp', () => {
            this.controls.enabled = true;
        });
        sceneHelpers.add(transformControls);
        EventTools.on('entityupdate', () => {
            if (inspector.selectedEntity && inspector.selectedEntity.object3DMap.mesh) {
                this.selectionBox.update(inspector.selected);
            }
        });
        this.transformControls = transformControls;
    }

    /**
     *
     *
     * @param {InspectorTools} inspector
     * @memberof ViewportTools
     */
    initControls(inspector: InspectorTools) {
        const { camera, container, sceneEl } = inspector;
        const controls = new AFRAME.THREE.EditorControls(camera, container);
        controls.center.set(0, 1.6, 0);
        controls.rotationSpeed = 0.0035;
        controls.zoomSpeed = 0.05;
        controls.setAspectRatio(sceneEl.canvas.width / sceneEl.canvas.height);
        EventTools.on('cameratoggle', data => {
            controls.setCamera(data.camera);
            this.transformControls.setCamera(data.camera);
        });
        this.controls = controls;
        this.enableControls();
    }

    /**
     *
     *
     * @param {InspectorTools} inspector
     * @memberof ViewportTools
     */
    initEvents(inspector: InspectorTools) {
        const { camera } = inspector;
        EventTools.on('inspectorcleared', () => {
            this.controls.center.set(0, 0, 0);
        });
        EventTools.on('transformmodechange', mode => {
            this.transformControls.setMode(mode);
        });
        EventTools.on('snapchanged', dist => {
            this.transformControls.setTranslationSnap(dist);
        });
        EventTools.on('transformspacechanged', space => {
            this.transformControls.setSpace(space);
        });
        EventTools.on('objectselect', object3D => {
            this.selectionBox.visible = false;
            this.transformControls.detach();
            if (object3D && object3D.el) {
                if (object3D.el.getObject3D('mesh')) {
                    this.selectionBox.setFromObject(object3D).update();
                    this.selectionBox.visible = true;
                }
                this.transformControls.attach(object3D);
            }
        });
        EventTools.on('objectfocus', object => {
            this.controls.focus(object, false);
            this.transformControls.update();
        });
        EventTools.on('geometrychanged', object => {
            if (object !== null) {
                this.selectionBox.setFromObject(object).update();
            }
        });
        EventTools.on('entityupdate', detail => {
            const { object3D } = detail.entity;
            if (object3D && inspector.selected === object3D) {
                // Hack because object3D always has geometry :(
                if (
                    object3D.geometry &&
                    ((object3D.geometry.vertices && object3D.geometry.vertices.length > 0) ||
                    (object3D.geometry.attributes &&
                        object3D.geometry.attributes.position &&
                        object3D.geometry.attributes.position.array.length))
                ) {
                    this.selectionBox.setFromObject(object3D).update();
                }
            }
            if (object3D) {
                this.transformControls.update();
                if (object3D instanceof AFRAME.THREE.PerspectiveCamera) {
                    object3D.updateProjectionMatrix();
                }
                this.updateHelpers(inspector, object3D);
            }
        });
        EventTools.on('windowresize', () => {
            camera.aspect = inspector.container.offsetWidth / inspector.container.offsetHeight;
            camera.updateProjectionMatrix();
        });
        EventTools.on('gridvisibilitychanged', (showGrid?: boolean) => {
            this.grid.visible = showGrid;
        });
        EventTools.on('togglegrid', () => {
            this.grid.visible = !this.grid.visible;
        });
        EventTools.on('inspectortoggle', active => {
            if (active) {
                this.enableControls();
                AFRAME.INSPECTOR.sceneEl.camera = inspector.camera;
                inspector.cameras.original.setAttribute('camera', 'active', false);
                if (inspector.cameras.original.hasAttribute('orbit-controls')) {
                    inspector.cameras.original.setAttribute('orbit-controls', 'enabled', false);
                }
                Array.prototype.slice
                .call(document.querySelectorAll('.a-enter-vr,.rs-base'))
                .forEach(element => {
                    element.style.display = 'none';
                });
            } else {
                this.disableControls();
                inspector.cameras.original.setAttribute('camera', 'active', true);
                if (inspector.cameras.original.hasAttribute('orbit-controls')) {
                    inspector.cameras.original.setAttribute('orbit-controls', 'enabled', true);
                }
                AFRAME.INSPECTOR.sceneEl.camera = inspector.cameras.original.getObject3D('camera') as ICamera;
                Array.prototype.slice
                .call(document.querySelectorAll('.a-enter-vr,.rs-base'))
                .forEach(element => {
                    element.style.display = 'block';
                });
            }
        });
    }

    /**
     *
     *
     * @param {InspectorTools} inspector
     * @param {THREE.Object3D} object
     * @memberof ViewportTools
     */
    updateHelpers(inspector: InspectorTools, object: THREE.Object3D) {
        if (object) {
            object.traverse(node => {
                if (inspector.helpers[node.uuid]) {
                    inspector.helpers[node.uuid].update();
                }
            });
        }
    }

    /**
     *
     *
     * @memberof ViewportTools
     */
    enableControls() {
        this.mouseCursor.enable();
        this.transformControls.activate();
        this.controls.activate();
        this.controls.enabled = true;
    }

    /**
     *
     *
     * @memberof ViewportTools
     */
    disableControls() {
        // this.mouseCursor.disable();
        this.transformControls.dispose();
        this.controls.dispose();
        this.controls.enabled = false;
    }
}

export default ViewportTools;
