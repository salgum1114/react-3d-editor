import React, { Component } from 'react';

class Inspector extends Component {
    inspector: HTMLElement;

    componentDidMount() {
        this.inspector = document.body;
        this.initRender(this.inspector);
    }

    initRender = (inspector: HTMLElement) => {
        const scene = document.createElement('a-scene');
        inspector.appendChild(scene);
        scene.style.position = 'fixed';
        scene.style.top = '0';
        scene.style.left = '0';
        const box = document.createElement('a-box');
        scene.appendChild(box);
        // scene.innerHTML = `
        //     <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
        //     <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
        //     <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
        //     <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
        //     <a-sky color="#ECECEC"></a-sky>
        // `;
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }} id="inspector" />
        );
    }
}

export default Inspector;
