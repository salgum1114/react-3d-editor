import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';

export interface FramePortalProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
    scene?: string;
    ar?: boolean;
}

class AframePortal extends PureComponent<FramePortalProps> {
    iframeEl: HTMLIFrameElement;
    head: HTMLHeadElement;
    body: HTMLElement;
    viewerEl: HTMLDivElement;

    constructor(props: FramePortalProps) {
        super(props);
        this.iframeEl = null;
    }

    componentDidMount() {
        this.head = this.iframeEl.contentDocument.head;
        const aframeScript = document.createElement('script') as any;
        aframeScript.src = 'https://aframe.io/releases/0.9.2/aframe.min.js';
        aframeScript.async = true;
        aframeScript.onload = () => {
            const aframeExtraScript = document.createElement('script') as any;
            aframeExtraScript.src = 'https://cdn.rawgit.com/donmccurdy/aframe-extras/v6.0.0/dist/aframe-extras.min.js';
            aframeExtraScript.async = true;
            aframeExtraScript.onload = this.handleAppendScene;
            aframeExtraScript.onerror = this.handleAppendScene;
            this.head.appendChild(aframeExtraScript);
        };
        this.head.appendChild(aframeScript);
        this.body = this.iframeEl.contentDocument.body;
        this.body.style.margin = '0';
        this.forceUpdate();
    }

    handleAppendScene = () => {
        const { scene, ar } = this.props;
        if (!ar) {
            this.iframeEl.contentDocument.body.querySelector('#viewer').innerHTML = scene;
        } else {
            const aframeARScript = document.createElement('script') as any;
            aframeARScript.src = './vendor/ar.js/aframe/build/aframe-ar.min.js';
            aframeARScript.async = true;
            aframeARScript.onload = () => {
                this.iframeEl.contentDocument.body.querySelector('#viewer').innerHTML = scene;
            };
            this.head.appendChild(aframeARScript);
        }
    }

    render() {
        const { children, scene, ar, ...other } = this.props;
        return (
            <iframe ref={c => { this.iframeEl = c; }} {...other}>
                {this.body && createPortal(<div id="viewer" />, this.body)}
            </iframe>
        );
    }
}

export default AframePortal;
