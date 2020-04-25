import React, { Component } from 'react';
import { Entity } from 'aframe';

import { EventTools } from '../../tools';
import Icon from 'polestar-icons';
import { capitalize } from '../../tools/UtilTools';

interface IProps {
    style?: React.CSSProperties;
    className?: string;
}

interface IState {
    hoveredEntity?: Entity;
}

class ViewportToolbar extends Component<IProps, IState> {
    state: IState = {
        hoveredEntity: null,
    }

    componentDidMount() {
        EventTools.on('raycastermouseenter', el => {
            this.setState({
                hoveredEntity: el,
            });
        });

        EventTools.on('raycastermouseleave', el => {
            this.setState({
                hoveredEntity: el,
            });
        });
    }

    renderEntity = (entity?: Entity) => {
        let title;
        const { name } = entity.object3D;
        if (name.length) {
            title = name;
        } else if (entity.title) {
            title = entity.title;
        } else if (entity.id) {
            title = capitalize(entity.id);
        } else {
            title = entity.tagName;
        }
        return (
            <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <Icon name={entity.dataset.icon || 'cube'} style={{ marginRight: 4, fontSize: '1.25rem' }} />
                <div>{title}</div>
            </div>
        );
    }

    render() {
        const { style, className } = this.props;
        const { hoveredEntity } = this.state;
        return (
            <div style={style} className={className}>
                {hoveredEntity ? this.renderEntity(hoveredEntity) : ''}
            </div>
        );
    }
}

export default ViewportToolbar;
