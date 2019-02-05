import React, { Component } from 'react';
import { Scene, Entity } from 'aframe';
import ViewportTools from '../../tools/ViewportTools';
import { EventTools, EntityTools } from '../../tools';
import CameraTools from '../../tools/CameraTools';
import { KeyMapper, Omit } from '../../types/utils';
import ShortcutTools from '../../tools/ShortcutTools';

export interface IInspector {
    sceneEl?: IScene;
    scene: THREE.Object3D;
    camera?: ICamera;
    container?: HTMLElement;
    currentCameraEl?: Entity;
    cameras?: ICameras;
    sceneHelpers?: THREE.Scene;
    helpers?: KeyMapper;
    cursor?: Entity;
    modules?: KeyMapper;
    history?: any;
    isFirstOpen?: boolean;
    opened?: boolean;
    exporters?: KeyMapper;
    assetsLoader?: any;
    on?: any;
}

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

class Inspector extends Component {
    sceneEl: IScene;
    scene: THREE.Object3D;
    camera: ICamera;
    container: HTMLElement;
    currentCameraEl?: Entity;
    cameras?: ICameras;
    sceneHelpers?: THREE.Scene;
    helpers?: KeyMapper;
    cursor?: Entity;
    shortcutTools?: ShortcutTools;

    componentDidMount() {
        this.initScene(document.body);
        this.waitForScene();
    }

    waitForScene = () => {
        if (!AFRAME.scenes.length) {
            setTimeout(() => {
                this.waitForScene();
            }, 100);
            return;
        }
        this.sceneEl = AFRAME.scenes[0];
        this.scene = this.sceneEl.object3D;
        if (!this.sceneEl.hasLoaded) {
            setTimeout(() => {
                this.waitForScene();
            }, 100);
            return;
        }
        this.container = document.querySelector('.a-canvas');
        this.initCamera();
        this.initShortcut();
        this.initViewport();
        // this.initEvents();
        this.initAssets();
        this.initEntity();
    }

    initScene = (inspector: HTMLElement) => {
        const scene = document.createElement('a-scene');
        inspector.appendChild(scene);
        scene.id = 'scene';
        scene.style.position = 'fixed';
        scene.style.top = '0';
        scene.style.left = '0';
    }

    initCamera = () => {
        const cameraTools = new CameraTools(this);
    }

    initViewport = () => {
        const scene = this.sceneEl.object3D;
        this.helpers = {};
        this.sceneHelpers = new AFRAME.THREE.Scene();
        this.sceneHelpers.userData.source = 'INPSECTOR';
        this.sceneHelpers.visible = true;
        const viewportTools = new ViewportTools(this);
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
        EventTools.on('entityselect', entity => {
            this.selectEntity(entity, false);
        });
        EventTools.on('inspectortoggle', active => {
            this.inspectorActive = active;
            this.sceneHelpers.visible = this.inspectorActive;
        });
        EventTools.on('entitycreate', definition => {
            EntityTools.createEntity(definition, entity => {
                this.selectEntity(entity);
            });
        });
        document.addEventListener('child-detached', event => {
            const entity = event.detail.el;
            this.removeObject(entity.object3D);
        });
    }

    initAssets = () => {
        const assets = document.createElement('a-assets');
        this.sceneEl.appendChild(assets);
    }

    initEntity = () => {
        const plane = document.createElement('a-plane');
        plane.setAttribute('position', '0 0 -4');
        plane.setAttribute('rotation', '-90 0 0');
        plane.setAttribute('width', '4');
        plane.setAttribute('height', '4');
        plane.setAttribute('color', '#7BC8A4');
        console.log(plane);
        this.sceneEl.appendChild(plane);
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

    open = (focusEl: Entity) => {
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
            focusEl = document.getElementById(
                AFRAME.utils.getUrlParameter('inspector'),
            ) as Entity;
        }
        if (focusEl) {
            this.selectEntity(focusEl);
            EventTools.emit('objectfocus', focusEl.object3D);
        }
        this.isFirstOpen = false;
    }

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

    toggle = () => {
        if (this.opened) {
            this.close();
        } else {
            this.open();
        }
    }

    selectEntity = (entity: Entity, emit: boolean) => {
        this.selectedEntity = entity;
        if (entity) {
            this.selectObject(entity.object3D);
        } else {
            this.selectObject(null);
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
        entity.object3D.traverse(node => {
            if (this.helpers[node.uuid]) {
                this.helpers[node.uuid].visible = true;
            }
        });
    }

    selectObject = (object: THREE.Object3D) => {
        if (this.selected === object) {
            return;
        }
        this.selected = object;
        EventTools.emit('objectselect', object);
    }

    selectById = (id: number) => {
        if (id === this.camera.id) {
            this.selectObject(this.camera);
            return;
        }
        this.selectObject(this.scene.getObjectById(id));
    }

    deselect = () => {
        this.selectObject(null);
    }

    removeObject = (object: THREE.Object3D) => {
        // Remove just the helper as the object will be deleted by A-Frame
        this.removeHelpers(object);
        EventTools.emit('objectremove', object);
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

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }} id="inspector" />
        );
    }
}

export default Inspector;
