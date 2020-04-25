import React, { Component } from 'react';

import { AframePortal } from '../common';
import { InspectorTools } from '../../tools';

class IFrameInspector extends Component {
    aframePortal: AframePortal;

    componentDidMount() {
        this.waitForViewer(this.aframePortal.viewerEl);
    }

    waitForViewer = (viewerEl: HTMLElement) => {
        if (!viewerEl) {
            setTimeout(() => {
                this.waitForViewer(this.aframePortal.viewerEl);
            }, 50);
            return;
        }
        AFRAME.INSPECTOR = new InspectorTools({
            target: this.aframePortal.viewerEl,
        });
    }

    render() {
        return (
            <div className="inspector">
                <AframePortal ref={c => { this.aframePortal = c; }} />
            </div>
        );
    }
}

export default IFrameInspector;
