import React, { Component } from 'react';
import { Entity } from 'aframe';
import debounce from 'lodash/debounce';

import { SidebarContainer } from '../common';
import { EventTools } from '../../tools';
import Property from './Property';
import Icon from 'polestar-icons';
import { getIcon } from '../../constants';

interface IState {
    selectedEntity?: Entity;
    selectedAsset?: Entity;
}

class Properties extends Component {
    state: IState = {
        selectedEntity: null,
        selectedAsset: null,
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
        EventTools.on('assetselect', (asset: Entity) => {
            this.setState({
                selectedAsset: asset,
            });
        });
        EventTools.on('entityupdate', debounce(() => {
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
        const { selectedEntity, selectedAsset } = this.state;
        let entityTitle;
        const selected = selectedEntity || selectedAsset;
        if (selected) {
            const { object3D } = selected;
            if (object3D) {
                const { name } = object3D;
                if (name.length) {
                    entityTitle = name;
                }
            }
            if (selected.title) {
                entityTitle = selected.title;
            } else if (selected.id) {
                entityTitle = selected.id;
            } else if (selected.hasAttribute('name')){
                entityTitle = selected.getAttribute('name');
            } else {
                entityTitle = selected.tagName;
            }
        }
        const title = selected ? (
            <>
                <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                    <Icon name={getIcon(selected.tagName.toLowerCase())} style={{ marginRight: 4, fontSize: '1.25rem' }} />
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entityTitle}</div>
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
        const type = selected && selected.object3D ? 'entity' : 'asset';
        return (
            <SidebarContainer
                title={title}
            >
                <Property entity={selected} type={type} />
            </SidebarContainer>
        );
    }
}

export default Properties;
