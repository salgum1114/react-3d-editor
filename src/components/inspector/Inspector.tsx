import React, { Component } from 'react';
import { InspectorTools } from '../../tools';

class Inspector extends Component {
    inspector?: InspectorTools;

    componentDidMount() {
        this.inspector = new InspectorTools();
        AFRAME.INSPECTOR = this.inspector;
    }

    render() {
        return (
            <div className="inspector" />
        );
    }
}

export default Inspector;
