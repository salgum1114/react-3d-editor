import React, { Component } from 'react';
import 'aframe-extras';

class ArInspector extends Component {
    componentDidMount() {
        this.initARScene();
    }

    initARScene = () => {
        const script = document.createElement('script') as any;
        script.src = '/vendor/ar.js/aframe/build/aframe-ar.min.js';
        script.async = true;
        script.onload = () => {
            const scene = document.createElement('a-scene');
            scene.id = 'scene';
            scene.title = 'Scene';
            scene.style.position = 'fixed';
            scene.style.top = '0';
            scene.style.left = '0';
            scene.setAttribute('vr-mode-ui', 'false');
            scene.setAttribute('embedded', '');
            scene.setAttribute('arjs', 'debugUIEnabled: false; maxDetectionRate:30; sourceType: webcam;');
            scene.innerHTML = `
                <!-- define your markers -->
                <a-marker preset='hiro'>
                    <!-- here define the content to display on top of the marker -->
                    <a-box position='0 0.5 0' material='color: red;'></a-box>
                </a-marker>
                <!-- Define a static camera -->
                <a-camera-static/>
            `;
            document.body.appendChild(scene);
        };
        document.head.appendChild(script);
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }} id="ar-inspector" />
        );
    }
}

export default ArInspector;
