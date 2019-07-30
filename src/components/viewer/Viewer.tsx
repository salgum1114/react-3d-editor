import React, { Component } from 'react';

class Viewer extends Component {
    timeout: NodeJS.Timeout;

    componentDidMount() {
        const viewer = document.getElementById('viewer');
        console.log(document, document.parentElement);
        // this.waitForViewer(viewer);
    }

    waitForViewer = (viewer?: HTMLElement) => {
        if (viewer) {
            const fragement = document.createRange().createContextualFragment(`
                <a-scene vr-mode-ui="false">
                    <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
                    <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
                    <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
                    <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
                    <a-sky color="#ECECEC"></a-sky>
                </a-scene>
            `);
            viewer.appendChild(fragement);
            return;
        }
        this.timeout = setTimeout(() => {
            const viewer = document.getElementById('viewer');
            console.log(viewer);
            this.waitForViewer(viewer);
        }, 50);
    }

    render() {
        return (
            <div id="viewer" />
        );
    }
}

export default Viewer;
