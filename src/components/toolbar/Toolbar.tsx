import React, { Component } from 'react';
import CameraToolbar from './CameraToolbar';

class Toolbar extends Component {
    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <CameraToolbar />
            </div>
        );
    }
}

export default Toolbar;
