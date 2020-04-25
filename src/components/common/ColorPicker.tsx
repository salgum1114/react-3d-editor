import React, { Component } from 'react';
import { Popover, Button } from 'antd';
import { SketchPicker, Color } from 'react-color';

interface IProps {
    onChange?: (color: Color) => void;
    value?: any;
    disabled?: boolean;
}

class ColorPicker extends Component<IProps> {
    handlers = {
        onChange: (color: any) => {
            const { onChange } = this.props;
            this.setState({
                color: `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`,
            }, () => {
                onChange(`rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`);
            });
        },
    }

    state = {
        color: this.props.value || 'rgba(255, 255, 255, 1)',
    }

    UNSAFE_componentWillReceiveProps(nextProps: IProps) {
        this.setState({
            color: nextProps.value || this.state.color,
        });
    }

    render() {
        const { color } = this.state;
        const { onChange } = this.handlers;
        return (
            <Popover
                trigger="click"
                placement="bottom"
                style={{ zIndex: 9999 }}
                overlayStyle={{ zIndex: 9999 }}
                content={<SketchPicker disableAlpha={true} color={color} onChange={onChange} />}
            >
                <div style={{ display: 'flex', flex: 1, alignItems: 'center', cursor: 'pointer' }}>
                    <Button style={{ background: color }} shape="circle" />
                    <span style={{ marginLeft: 16 }}>{color}</span>
                </div>
            </Popover>
        );
    }
}

export default ColorPicker;
