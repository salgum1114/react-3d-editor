import React, { Component } from 'react';
import { Scene, Entity } from 'aframe';
import ViewportTools from '../../tools/ViewportTools';
import { EventTools } from '../../tools';
import CameraTools from '../../tools/CameraTools';
import { KeyMapper, Omit } from '../../types/utils';

export interface IInspector {
    sceneEl?: IScene;
    camera?: ICamera;
    container?: HTMLElement;
    currentCameraEl?: Entity;
    cameras?: ICameras;
    sceneHelpers?: THREE.Scene;
    helpers?: KeyMapper;
    cursor?: Entity;
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
    camera: ICamera;
    container: HTMLElement;
    sceneHelpers: THREE.Scene;

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
        if (!this.sceneEl.hasLoaded) {
            setTimeout(() => {
                this.waitForScene();
            }, 100);
            return;
        }
        this.container = document.querySelector('.a-canvas');
        this.initCamera();
        this.initViewport();
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
        this.sceneHelpers = new AFRAME.THREE.Scene();
        this.sceneHelpers.userData.source = 'INPSECTOR';
        this.sceneHelpers.visible = true;
        const viewportTools = new ViewportTools(this);
        EventTools.emit('windowresize');
        scene.add(this.sceneHelpers);
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
        this.sceneEl.appendChild(plane);
    }

    selectEntity = (entity: Entity) => {
        if (entity) {
            this.select(entity.object3D);
        } else {
            this.select(null);
        }
    }

    select = (object3D: THREE.Object3D) => {
        // if (this.selected === object3D) {
        //     return;
        // }
        // this.selected = object3D;
        EventTools.emit('objectselect', object3D);
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }} id="inspector" />
        );
    }
}

export default Inspector;
