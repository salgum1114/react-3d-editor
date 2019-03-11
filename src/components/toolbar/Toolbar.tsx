import React, { Component } from 'react';

import CameraToolbar from './CameraToolbar';
import TransformToolbar from './TransformToolbar';
import ViewportToolbar from './ViewportToolbar';

class Toolbar extends Component {
    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <CameraToolbar style={{ marginLeft: 8, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }} />
                <ViewportToolbar style={{ flex: 1, dispaly: 'flex', justifyContent: 'center', alignItems: 'center' }} />
                <TransformToolbar style={{ marginRight: 8, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} />
            </div>
        );
    }
}

export default Toolbar;
