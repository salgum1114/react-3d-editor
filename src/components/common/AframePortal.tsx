import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';

export interface FramePortalProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
    body?: string;
    ar?: boolean;
}

class AframePortal extends PureComponent<FramePortalProps> {
    iframeEl: HTMLIFrameElement;
    head: HTMLHeadElement;
    body: HTMLElement;

    constructor(props: FramePortalProps) {
        super(props);
        this.iframeEl = null;
    }

    componentDidMount() {
        const { body, ar } = this.props;
        this.head = this.iframeEl.contentDocument.head;
        const aframeScript = document.createElement('script') as any;
        aframeScript.src = 'https://aframe.io/releases/0.9.2/aframe.min.js';
        aframeScript.async = true;
        aframeScript.onload = () => {
            if (!ar) {
                this.iframeEl.contentDocument.body.querySelector('#viewer').innerHTML = body;
            }
        };
        this.head.appendChild(aframeScript);
        if (ar) {
            const aframeARScript = document.createElement('script') as any;
            aframeARScript.src = '/vendor/ar.js/aframe/build/aframe-ar.min.js';
            aframeARScript.async = true;
            aframeARScript.onload = () => {
                this.iframeEl.contentDocument.body.querySelector('#viewer').innerHTML = body;
            };
            this.head.appendChild(aframeARScript);
        }
        this.body = this.iframeEl.contentDocument.body;
        this.body.style.margin = '0';
        this.forceUpdate();
    }

    render() {
        const { children, body, ar, ...other } = this.props;
        return (
            <iframe ref={c => { this.iframeEl = c; }} {...other}>
                {this.body && createPortal(children, this.body)}
            </iframe>
        );
    }
}

export default AframePortal;
