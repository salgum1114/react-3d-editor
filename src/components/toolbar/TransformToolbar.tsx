import React, { Component } from 'react';
import { Button, Icon } from 'antd';

import { EventTools } from '../../tools';

interface IProps {
    style?: React.CSSProperties;
    className?: string;
}

const transforms = [
    { value: 'translate', icon: 'drag' },
    { value: 'rotate', icon: 'reload' },
    { value: 'scale', icon: 'fullscreen' },
];

class TransformToolbar extends Component<IProps> {
    state = {
        selectedTransform: 'translate',
    }

    componentDidMount() {
        EventTools.on('transformmodechange', selectedTransform => {
            this.setState({
                selectedTransform,
            });
        });
    }

    handleChangeTransformMode = (selectedTransform?: string) => {
        this.setState({
            selectedTransform,
        });
        EventTools.emit('transformmodechange', selectedTransform);
    }

    render() {
        const { style, className } = this.props;
        const { selectedTransform } = this.state;
        return (
            <div style={style} className={className}>
                <Button.Group>
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
                </Button.Group>
            </div>
        );
    }
}

export default TransformToolbar;
