import React, { Component } from 'react';
import { Select, Icon, Radio } from 'antd';

import { EventTools } from '../../tools';
import { EventType } from '../../constants';

interface IOption {
    value?: string;
    event?: EventType;
    payload?: string;
    label?: string;
}

interface IState {
    viewType?: string;
    selectedCamera?: string;
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

class CameraToolbar extends Component<IProps, IState> {
    justChangedCamera?: boolean;

    constructor(props: {}) {
        super(props);
        this.justChangedCamera = false;
    }

    state: IState = {
        selectedCamera: 'perspective',
        viewType: '3d',
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

    handleChangeViewType = (viewType: string) => {
        this.setState({
            viewType,
        });
    }

    render() {
        const { style, className } = this.props;
        const { selectedCamera, viewType } = this.state;
        return (
            <div style={style} className={className}>
                <Radio.Group
                    value={viewType}
                    defaultValue={viewType}
                    style={{ marginRight: 8 }}
                    buttonStyle="solid"
                    onChange={e => this.handleChangeViewType(e.target.value)}
                >
                    <Radio.Button value="2d">{'2D'}</Radio.Button>
                    <Radio.Button value="3d">{'3D'}</Radio.Button>
                </Radio.Group>
                {
                    viewType === '3d' ? (
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
                    ) : null
                }
            </div>
        );
    }
}

export default CameraToolbar;
