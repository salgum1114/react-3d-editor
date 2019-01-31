import React, { Component } from 'react';
import { Scene } from 'aframe';

class Inspector extends Component {
    sceneEl: Scene;

    componentDidMount() {
        this.initRender(document.body);
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
        if (!this.sceneEl.camera) {
            setTimeout(() => {
                this.waitForScene();
            }, 100);
            return;
        }
        this.initEntity();
        // this.sceneEl.addEventListener('loaded', this.init.bind(this), {
        //     once: true,
        // });
    }

    initRender = (inspector: HTMLElement) => {
        const scene = document.createElement('a-scene');
        inspector.appendChild(scene);
        scene.style.position = 'fixed';
        scene.style.top = '0';
        scene.style.left = '0';
    }

    initEntity = () => {
        console.log(AFRAME.scenes.length);
        //<a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4">
        const plane = document.createElement('a-plane');
        plane.setAttribute('position', '0 0 -4');
        plane.setAttribute('rotation', '-90 0 0');
        plane.setAttribute('width', '4');
        plane.setAttribute('height', '4');
        plane.setAttribute('color', '#7BC8A4');
        plane.addEventListener('loaded', () => {
            // box.setAttribute('position', '0 0 0');
            // box.setAttribute('scale', '1 1 1');
            console.log('box loaded', plane.attributes);
        });
        this.sceneEl.appendChild(plane);
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }} id="inspector" />
        );
    }
}

export default Inspector;
