import React, { Component } from 'react';
import { Entity } from 'aframe';

import { EventTools } from '../../tools';

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
        return (
            <strong style={{ display: 'flex', justifyContent: 'center' }}>
                {entity ? entity.title : ''}
            </strong>
        );
    }

    render() {
        const { style, className } = this.props;
        const { hoveredEntity } = this.state;
        return (
            <div style={style} className={className}>
                {this.renderEntity(hoveredEntity)}
            </div>
        );
    }
}

export default ViewportToolbar;
