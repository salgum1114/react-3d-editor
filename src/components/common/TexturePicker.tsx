import React, { Component } from 'react';
import { Modal, Input, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Entity } from 'aframe';

interface IProps extends FormComponentProps {
    schema: any;
    entity?: Entity;
    data?: any;
    componentName?: string;
    schemaKey?: string;
    onChange?: (value?: any) => void;
}

class TexturePicker extends Component<IProps> {
    state = {
        visible: false,
    }

    handleClick = () => {
        this.setState({
            visible: !this.state.visible,
        });
    }

    handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { onChange } = this.props;
        onChange(e.target.value);
    }

    render() {
        const { visible } = this.state;
        return (
            <>
                <Input onChange={this.handleChangeInput} addonAfter={<Icon type="shop" onClick={this.handleClick} />} />
                <Modal
                    visible={visible}
                    closable={true}
                    onCancel={this.handleClick}
                    footer={[]}
                >

                </Modal>
            </>
        );
    }
}

export default TexturePicker;
