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
        EventTools.on('entityupdate', (payload: any) => {
            this.forceUpdate();
        });
    }

    render() {
        const { selectedEntity } = this.state;
        return (
            <SidebarContainer
                title="A-Frame"
            >
                <Property entity={selectedEntity} />
            </SidebarContainer>
        );
    }
}
 
export default Properties;
