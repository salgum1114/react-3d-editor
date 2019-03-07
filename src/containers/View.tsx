import React, { Component } from 'react';
import { Inspector } from '../components/inspector';
import { Toolbar } from '../components/toolbar';

class View extends Component {
    render() {
        return (
            <div className="editor-view-container">
                <div className="editor-view-header">
                    <Toolbar />
                </div>
                <div className="editor-view-content">
                    <Inspector />
                </div>
            </div>
        );
    }
}

export default View;
