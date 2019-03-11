import React, { Component } from 'react';
import { Button, Icon, Switch } from 'antd';

import { EventTools } from '../../tools';

interface IProps {
    style?: React.CSSProperties;
}

const transforms = [
    { value: 'translate', icon: 'drag' },
    { value: 'rotate', icon: 'reload' },
    { value: 'scale', icon: 'fullscreen' },
];

class TransformToolbar extends Component<IProps> {
    state = {
        selectedTransform: 'translate',
        localSpace: false,
    }

    componentDidMount() {
        EventTools.on('transformmodechange', selectedTransform => {
            this.setState({
                selectedTransform,
            });
        });

        EventTools.on('transformspacechange', () => {
            EventTools.emit('transformspacechanged', this.state.localSpace ? 'world' : 'local');
            this.setState({
                localSpace: !this.state.localSpace,
            });
        });
    }

    handleChangeTransformMode = (selectedTransform?: string) => {
        this.setState({
            selectedTransform,
        });
        EventTools.emit('transformmodechange', selectedTransform);
    }

    handleChangeLocalSpace = (localSpace?: boolean) => {
        this.setState({
            localSpace,
        });
        EventTools.emit('transformspacechanged', localSpace ? 'local' : 'world');
    }

    render() {
        const { style } = this.props;
        const { localSpace, selectedTransform } = this.state;
        return (
            <div style={style}>
                <div style={{ marginRight: 16 }}>
                    {
                        transforms.map(transform => (
                            <Button
                                key={transform.value}
                                type={selectedTransform === transform.value ? 'primary' : 'default'}
                                onClick={() => this.handleChangeTransformMode(transform.value)}
                            >
                                <Icon type={transform.icon} />
                            </Button>
                        ))
                    }
                </div>
                <label
                    style={{ marginRight: 8 }}
                    htmlFor="local"
                    title="Toggle between local and world space transforms"
                >
                    Local
                </label>
                <Switch size="small" onChange={this.handleChangeLocalSpace} checked={localSpace} />
            </div>
        );
    }
}

export default TransformToolbar;
