import React, { Component } from 'react';
import { InspectorTools, EventTools } from '../../tools';

class Inspector extends Component {
    inspector?: InspectorTools;

    componentDidMount() {
        this.inspector = new InspectorTools();
        AFRAME.INSPECTOR = this.inspector;
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }} id="inspector" />
        );
    }
}

export default Inspector;
