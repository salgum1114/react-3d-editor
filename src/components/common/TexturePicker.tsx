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

    render() {
        const { visible } = this.state;
        return (
            <>
                <Input addonAfter={<Icon type="shop" onClick={this.handleClick} />} />
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
