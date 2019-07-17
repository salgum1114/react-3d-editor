import { Entity, Scene } from 'aframe';

import { ObjectMapper, Omit } from '../types/utils';
import {
    ShortcutTools,
    EventTools,
    CameraTools,
    ViewportTools,
    HistoryTools,
    AssetTools,
} from './';
import Components from '../constants/components';

export interface ICameras {
    perspective?: THREE.PerspectiveCamera;
    original?: Entity;
    ortho?: THREE.OrthographicCamera;
}

export interface IScene extends Omit<Scene, 'camera'> {
    camera?: ICamera;
}

export interface ICamera extends THREE.Camera {
    el?: Entity;
}

export interface IInsepctorOptions {
    playerCamera?: boolean;
}

Components.forEach(Comp => Comp());

class InspectorTools {
    sceneEl?: IScene;
    scene: THREE.Object3D;
    camera?: ICamera;
    container?: HTMLElement;
    currentCameraEl?: Entity;
    cameras?: ICameras;
    sceneHelpers?: THREE.Scene;
    helpers?: ObjectMapper;
    cursor?: Entity;
    modules?: ObjectMapper;
    history?: HistoryTools;
    isFirstOpen?: boolean;
    opened?: boolean;
    exporters?: ObjectMapper;
    assetsLoader?: any;
    on?: any;
    inspectorActive?: boolean;
    cameraHelper?: THREE.CameraHelper;
    selectedEntity?: Entity;
    selected?: THREE.Object3D;
    entityToCopy?: Entity;
    shortcutTools?: ShortcutTools;
    cameraTools?: CameraTools;
    viewportTools?: ViewportTools;

    constructor(options: IInsepctorOptions = {}) {
        this.assetsLoader = new AssetTools();
        // this.exporters = { gltf: new THREE.GLTFExporter() };
        this.history = new HistoryTools();
        this.isFirstOpen = true;
        this.modules = {};
        this.on = EventTools.on;
        this.opened = false;
        this.initScene(document.body, options);
        this.init();
    }

    init = () => {
        if (!AFRAME.scenes.length) {
            setTimeout(() => {
                this.init();
            }, 100);
            return;
        }
        this.sceneEl = AFRAME.scenes[0];
        if (!this.sceneEl.hasLoaded) {
            setTimeout(() => {
                this.init();
            }, 100);
            return;
        }
        if (!this.sceneEl.camera) {
            this.sceneEl.addEventListener('camera-set-active', () => {
                this.init();
            }, { once: true });
            return;
        }
        EventTools.emit('sceneloaded', this.sceneEl);
        EventTools.emit('entityselect', this.sceneEl);
        this.scene = this.sceneEl.object3D;
        this.container = document.querySelector('.a-canvas');
        this.initCamera();
        this.initShortcut();
        this.initViewport();
        this.initEvents();
    }

    /**
     * Initial Scene
     *
     * @param {HTMLElement} inspector
     * @param {boolean} playCamera
     */
    initScene = (inspector: HTMLElement, options: IInsepctorOptions) => {
        const scene = document.createElement('a-scene');
        const { playerCamera = true } = options;
        if (playerCamera) {
            scene.appendChild(this.initAssets());
            scene.appendChild(this.initEntities());
        }
        inspector.appendChild(scene);
        scene.id = 'scene';
        scene.title = 'Scene';
        scene.style.position = 'fixed';
        scene.style.top = '0';
        scene.style.left = '0';
    }

    initAssets = () => {
        return document.createRange().createContextualFragment(`
            <a-assets id="assets">
                <a-mixin id="blue" material="color: #4CC3D9"></a-mixin>
                <a-mixin id="blueBox" geometry="primitive: box; depth: 2; height: 5; width: 1" material="color: #4CC3D9"></a-mixin>
                <a-mixin id="box" geometry="primitive: box; depth: 1; height: 1; width: 1"></a-mixin>
                <a-mixin id="cylinder" geometry="primitive: cylinder; height: 0.3; radius: 0.75; segmentsRadial: 6"></a-mixin>
                <a-mixin id="green" material="color: #7BC8A4"></a-mixin>
                <a-mixin id="orange" material="color: #F16745"></a-mixin>
                <a-mixin id="purple" material="color: #93648D"></a-mixin>
                <a-mixin id="short" scale="1 0.5 1"></a-mixin>
                <a-mixin id="yellow" material="color: #FFC65D"></a-mixin>
                <img id="crateImg" src="https://aframe.io/sample-assets/assets/images/wood/crate.gif" crossOrigin="true">
                <img id="floorImg" src="https://aframe.io/sample-assets/assets/images/terrain/grasslight-big.jpg" crossOrigin="true">
            </a-assets>
        `);
    }

    initEntities = () => {
        return document.createRange().createContextualFragment(`
            <a-entity id="environment" environment="preset: forest; fog: false"></a-entity>

            <!-- Meshes. -->
            <a-entity id="blueBox" mixin="blueBox" position="0 8 0"></a-entity>
            <a-entity id="shortOrangeBox" mixin="short orange box" position="-5 2 0"></a-entity>
            <a-entity id="shortYellowBox" mixin="short yellow box" position="5 2 0"></a-entity>
            <a-entity id="redBox" geometry="primitive: box" material="color:#f00" position="-4 1 0" animation="property: object3D.rotation.y; to: 360; loop: true; easing: linear; dur: 9600"></a-entity>
            <a-entity id="yellowSphere" geometry="primitive: sphere" material="color:#ff0; metalness:0.0; roughness:1.0" position="-2 2 -2"></a-entity>
            <a-box src="https://aframe.io/sample-assets/assets/images/bricks/brick_bump.jpg" position="-5 5 -2" width="1" color="#F16745"></a-box>
            <a-box id="box" position="0 2 0" height="2" color="#FFC65D"></a-box>

            <!-- Models. -->
            <a-entity id="boxModel1" class="boxClass" geometry="primitive: box" material="src: #crateImg" position="3 4 0"></a-entity>
            <a-entity id="boxModel2" class="boxClass" geometry="primitive: box" material="color: #0f0" position="4 2 4"></a-entity>

            <!-- Floor. -->
            <a-entity id="floor" geometry="primitive: box; height: .2; depth: 24; width: 24"
                        material="src: #floorImg; color: #fafafa; metalness: .1; repeat: 50 20; roughness: 1"></a-entity>

            <!-- Lights. -->
            <a-entity id="pointLight" light="type: directional; intensity: 1" position="0 3 3"></a-entity>

            <!-- Camera. -->
            <a-entity id="cameraWrapper" position="0 1.6 8">
                <a-entity id="camera" camera look-controls wasd-controls>
                <!-- Cursor. -->
                <a-entity id="cursor" position="0 0 -2"
                            geometry="primitive: ring; radiusOuter: 0.016; radiusInner: 0.01"
                            material="color: #ff9; shader: flat; transparent: true; opacity: 0.5"
                            scale="2 2 2" raycaster>
                </a-entity>
                </a-entity>
            </a-entity>
        `);
    }

    initCamera = () => {
        this.cameraTools = new CameraTools(this);
    }

    initViewport = () => {
        const scene = this.sceneEl.object3D;
        this.helpers = {};
        this.sceneHelpers = new AFRAME.THREE.Scene();
        this.sceneHelpers.userData.source = 'INPSECTOR';
        this.sceneHelpers.visible = true;
        this.inspectorActive = false;
        this.viewportTools = new ViewportTools(this);
        EventTools.emit('windowresize');
        scene.add(this.sceneHelpers);
        scene.traverse(node => {
            this.addHelper(node);
        });
        scene.add(this.sceneHelpers);
        this.open();
    }

    initShortcut = () => {
        this.shortcutTools = new ShortcutTools(this);
    }

    initEvents = () => {
        window.addEventListener('keydown', evt => {
            // Alt + Ctrl + i: Shorcut to toggle the inspector
            const shortcutPressed = evt.keyCode === 73 && evt.ctrlKey && evt.altKey;
            if (shortcutPressed) {
                this.toggle();
            }
        });
        EventTools.on('entityselect', (entity: Entity) => {
            this.selectEntity(entity, false);
        });
        EventTools.on('inspectortoggle', (active?: boolean) => {
            this.inspectorActive = active;
            this.sceneHelpers.visible = this.inspectorActive;
        });
        EventTools.on('entitycreate', (entity: Entity) => {
            this.selectEntity(entity);
        });
        document.addEventListener('child-detached', event => {
            const entity = event.detail.el;
            this.removeObject(entity.object3D);
        });
    }

    removeObject = (object: THREE.Object3D) => {
        // Remove just the helper as the object will be deleted by A-Frame
        this.removeHelpers(object);
        EventTools.emit('objectremove', object);
    }

    addHelper = (object: THREE.Object3D) => {
        const geometry = new AFRAME.THREE.SphereBufferGeometry(2, 4, 2);
        const material = new AFRAME.THREE.MeshBasicMaterial({
            color: 0xff0000,
            visible: false,
        });

        let helper;
        if (object instanceof AFRAME.THREE.Camera) {
            this.cameraHelper = helper = new AFRAME.THREE.CameraHelper(object, 0.1);
        } else if (object instanceof AFRAME.THREE.PointLight) {
            helper = new AFRAME.THREE.PointLightHelper(object, 1);
        } else if (object instanceof AFRAME.THREE.DirectionalLight) {
            helper = new AFRAME.THREE.DirectionalLightHelper(object, 1);
        } else if (object instanceof AFRAME.THREE.SpotLight) {
            helper = new AFRAME.THREE.SpotLightHelper(object, 1);
        } else if (object instanceof AFRAME.THREE.HemisphereLight) {
            helper = new AFRAME.THREE.HemisphereLightHelper(object, 1);
        } else if (object instanceof AFRAME.THREE.SkinnedMesh) {
            helper = new AFRAME.THREE.SkeletonHelper(object);
        } else {
            // no helper for this object type
            return;
        }
        helper.visible = false;
        this.sceneHelpers.add(helper);
        this.helpers[object.uuid] = helper;
        helper.update();
    }

    removeHelpers = (object: THREE.Object3D) => {
        object.traverse(node => {
            const helper = this.helpers[node.uuid];
            if (helper) {
                this.sceneHelpers.remove(helper);
                delete this.helpers[node.uuid];
                EventTools.emit('helperremove', this.helpers[node.uuid]);
            }
        });
    }

    /**
     * @description Select the entity
     * @param {Entity} entity
     * @param {boolean} [emit]
     * @returns
     */
    selectEntity = (entity: Entity, emit?: boolean) => {
        this.selectedEntity = entity;
        if (entity) {
            this.select(entity.object3D);
        } else {
            this.select(null);
        }
        if (entity && emit === undefined) {
            EventTools.emit('entityselect', entity);
        }
        // Update helper visibilities.
        Object.keys(this.helpers).forEach(id => {
            this.helpers[id].visible = false;
        });
        if (entity === this.sceneEl) {
            return;
        }
        if (entity) {
            entity.object3D.traverse(node => {
                if (this.helpers[node.uuid]) {
                    this.helpers[node.uuid].visible = true;
                }
            });
        }
    }

    /**
     * @description Select the entity by id
     * @param {number} id
     * @returns
     */
    selectById = (id: number) => {
        if (id === this.camera.id) {
            this.select(this.camera);
            return;
        }
        this.select(this.scene.getObjectById(id, true));
    }

    /**
     * @description Select the entity by Object3D
     * @param {THREE.Object3D} object3D
     * @returns
     */
    select = (object3D: THREE.Object3D) => {
        if (this.selected === object3D) {
            return;
        }
        this.selected = object3D;
        EventTools.emit('objectselect', object3D);
    }

    /**
     * @description Deselect entity
     */
    deselect = () => {
        this.select(null);
    }

    /**
     * @description Open or close inspector
     */
    toggle = () => {
        if (this.opened) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * @description Open the editor UI
     * @param {Entity} [focusEl]
     */
    open = (focusEl?: Entity) => {
        this.opened = true;
        EventTools.emit('inspectortoggle', true);

        if (this.sceneEl.hasAttribute('embedded')) {
            // Remove embedded styles, but keep track of it.
            this.sceneEl.removeAttribute('embedded');
            this.sceneEl.setAttribute('aframe-inspector-removed-embedded');
        }

        document.body.classList.add('aframe-inspector-opened');
        this.sceneEl.resize();
        this.sceneEl.pause();
        this.sceneEl.exitVR();

        this.shortcutTools.enable();

        // Trick scene to run the cursor tick.
        this.sceneEl.isPlaying = true;
        this.cursor.play();

        if (
            !focusEl &&
            this.isFirstOpen &&
            AFRAME.utils.getUrlParameter('inspector')
        ) {
            // Focus entity with URL parameter on first open.
            focusEl = document.getElementById(AFRAME.utils.getUrlParameter('inspector')) as Entity;
        }
        if (focusEl) {
            this.selectEntity(focusEl);
            EventTools.emit('objectfocus', focusEl.object3D);
        }
        this.isFirstOpen = false;
    }

    /**
     * @description Closes the editor and gives the control back to the scene
     */
    close = () => {
        this.opened = false;
        EventTools.emit('inspectortoggle', false);
        // Untrick scene when we enabled this to run the cursor tick.
        this.sceneEl.isPlaying = false;
        this.sceneEl.play();
        this.cursor.pause();
        if (this.sceneEl.hasAttribute('aframe-inspector-removed-embedded')) {
            this.sceneEl.setAttribute('embedded', '');
            this.sceneEl.removeAttribute('aframe-inspector-removed-embedded');
        }
        document.body.classList.remove('aframe-inspector-opened');
        this.sceneEl.resize();
        this.shortcutTools.disable();
    }
}

export default InspectorTools;
