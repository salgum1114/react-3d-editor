import React, { Component } from 'react';

import CameraToolbar from './CameraToolbar';
import TransformToolbar from './TransformToolbar';
import ViewportToolbar from './ViewportToolbar';

class Toolbar extends Component {
    render() {
        return (
            <div className="editor-toolbar-container">
                <CameraToolbar className="editor-toolbar-camera" />
                <ViewportToolbar className="editor-toolbar-viewport" />
                <TransformToolbar className="editor-toolbar-transform" />
            </div>
        );
    }
}

export default Toolbar;
