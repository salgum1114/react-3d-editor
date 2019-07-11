import React, { Component } from 'react';
import { Select, Icon } from 'antd';

import { EventTools } from '../../tools';
import { EventType } from '../../constants';

interface IOption {
    value?: string;
    event?: EventType;
    payload?: string;
    label?: string;
}

interface IProps {
    style?: React.CSSProperties;
    className?: string;
}

const options: IOption[] = [
    { value: 'perspective', event: 'cameraperspectivetoggle', payload: null, label: 'Perspective' },
    { value: 'ortholeft', event: 'cameraorthographictoggle', payload: 'left', label: 'Left View' },
    { value: 'orthoright', event: 'cameraorthographictoggle', payload: 'right', label: 'Right View' },
    { value: 'orthotop', event: 'cameraorthographictoggle', payload: 'top', label: 'Top View' },
    { value: 'orthobottom', event: 'cameraorthographictoggle', payload: 'bottom', label: 'Bottom View' },
    { value: 'orthoback', event: 'cameraorthographictoggle', payload: 'back', label: 'Back View' },
    { value: 'orthofront', event: 'cameraorthographictoggle', payload: 'front', label: 'Front View' },
];

class CameraToolbar extends Component<IProps> {
    justChangedCamera?: boolean;

    constructor(props: {}) {
        super(props);
        this.justChangedCamera = false;
    }

    state = {
        selectedCamera: 'perspective',
    }

    componentDidMount() {
        EventTools.on('cameratoggle', (data: IOption) => {
            if (this.justChangedCamera) {
                this.justChangedCamera = false;
                return;
            }
            this.setState({
                selectedCamera: data.value,
            });
        });
    }

    getOption = (value: string) => options.filter(option => option.value === value)[0];

    handleChange = (value: string) => {
        const option = this.getOption(value);
        this.justChangedCamera = true;
        this.setState({
            selectedCamera: option.value,
        });
        EventTools.emit(option.event, option.payload);
    }

    render() {
        const { style, className } = this.props;
        const { selectedCamera } = this.state;
        return (
            <div style={style} className={className}>
                <Select
                    onChange={this.handleChange}
                    value={selectedCamera}
                    suffixIcon={<Icon type="camera" />}
                >
                    {
                        options.map(option => (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))
                    }
                </Select>
            </div>
        );
    }
}

export default CameraToolbar;