import React, { Component } from 'react';
import { Scene } from '../components/Scene';

class View extends Component {
    render() {
        return (
            <div className="editor-view-container">
                <div className="editor-view-header">
                </div>
                <div className="editor-view-content">
                    <Scene />
                </div>
            </div>
        );
    }
}

export default View;
