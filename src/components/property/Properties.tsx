import React, { Component } from 'react';
import { Entity } from 'aframe';
import debounce from 'lodash/debounce';

import { SidebarContainer } from '../common';
import { EventTools } from '../../tools';
import Property from './Property';
import Icon from 'polestar-icons';
import { IDetailEntity } from '../../constants';
import { capitalize } from '../../tools/UtilTools';

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
        EventTools.on('entityupdate', debounce((detail: IDetailEntity) => {
            if (detail.component === 'name') {
                detail.entity.title = detail.value;
            }
            this.forceUpdate();
        }, 200));
        EventTools.on('componentadd', () => {
            this.forceUpdate();
        });
        EventTools.on('componentremove', () => {
            this.forceUpdate();
        });
    }

    render() {
        const { selectedEntity } = this.state;
        let entityTitle;
        if (selectedEntity) {
            const { name } = selectedEntity.object3D;
            if (name.length) {
                entityTitle = name;
            } else if (selectedEntity.title) {
                entityTitle = selectedEntity.title;
            } else if (selectedEntity.id) {
                entityTitle = capitalize(selectedEntity.id);
            } else {
                entityTitle = selectedEntity.tagName;
            }
        }
        const title = selectedEntity ? (
            <>
                <div style={{ display: 'flex', flex: 1 }}>
                    <Icon name={selectedEntity.dataset.icon || 'cube'} style={{ marginRight: 4, fontSize: '1.25rem' }} />
                    <div>{entityTitle}</div>
                </div>
                <div>
                    <Icon name="clipboard" className="editor-icon" />
                </div>
            </>
        ) : (
            <>
                <Icon name="cog" style={{ marginRight: 4, fontSize: '1.25rem' }} />
                <div>{'Properties'}</div>
            </>
        );
        return (
            <SidebarContainer
                title={title}
            >
                <Property entity={selectedEntity} />
            </SidebarContainer>
        );
    }
}

export default Properties;
