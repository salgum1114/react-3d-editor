import React, { Component } from 'react';
import { Scene } from 'aframe';

class Inspector extends Component {
    sceneEl: Scene;

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
        plane.addEventListener('loaded', () => {
            console.log('box loaded', plane);
        });
        // <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
        // <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
        // <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
        // <a-sky color="#ECECEC"></a-sky
        this.sceneEl.appendChild(plane);
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }} id="inspector" />
        );
    }
}

export default Inspector;
