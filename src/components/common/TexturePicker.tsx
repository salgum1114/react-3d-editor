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

interface IState {
    value?: string;
    visible?: boolean;
}

class TexturePicker extends Component<IProps> {
    state = {
        value: this.props.data instanceof HTMLImageElement ? `#${this.props.data.id}` : this.props.data,
        visible: false,
    }

    handleClick = () => {
        this.setState({
            visible: !this.state.visible,
        });
    }

    handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(e.target.value);
            this.setState({
                value: e.target.value,
            });
        }
    }

    render() {
        const { schema, form, entity, schemaKey, componentName } = this.props;
        const { visible, value } = this.state;
        return (
            <>
                <Input defaultValue={value} value={value} onChange={this.handleChangeInput} addonAfter={<Icon type="shop" onClick={this.handleClick} />} />
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
