import React, { Component } from 'react';
import { Entity } from 'aframe';

import { SidebarContainer } from '../common';
import { EventTools } from '../../tools';
import Property from './Property';

interface IState {
    selectedEntity?: Entity;
}

class Properties extends Component {
    state: IState = {
        selectedEntity: null,
    }

    componentDidMount() {
        EventTools.on('entityselect', (entity: Entity) => {
            this.setState({
                selectedEntity: entity,
            });
        });
        EventTools.on('objectselect', (object3D: THREE.Object3D) => {
            if (!object3D) {
                this.setState({
                    selectedEntity: null,
                });
            }
        });
        EventTools.on('entityupdate', () => {
            this.forceUpdate();
        });
        EventTools.on('componentadd', () => {
            this.forceUpdate();
        });
        EventTools.on('componentremove', () => {
            this.forceUpdate();
        });
    }

    render() {
        const { selectedEntity } = this.state;
        return (
            <SidebarContainer
                title="Properties"
            >
                <Property entity={selectedEntity} />
            </SidebarContainer>
        );
    }
}

export default Properties;
