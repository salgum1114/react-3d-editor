import React, { Component } from 'react';
import { Modal, Input, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Entity } from 'aframe';
import Textures, { ITexture } from './Textures';

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

class TexturePicker extends Component<IProps, IState> {
    state = {
        value: this.props.data instanceof HTMLImageElement ? `#${this.props.data.id}` : this.props.data,
        visible: false,
    }

    /**
     * @description
     * @param {ITexture} texture
     */
    private handleChangeTexture = (texture: ITexture) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(texture.url);
            this.handleModalVisible();
        }
    }

    /**
     * @description Change to visible in Modal
     */
    private handleModalVisible = () => {
        this.setState((prevState: IState) => {
            return {
                visible: !prevState.visible,
            };
        });
    }

    /**
     * @description Change to src
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    private handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                <Input defaultValue={value} value={value} onChange={this.handleChangeInput} addonAfter={<Icon type="shop" onClick={this.handleModalVisible} />} />
                <Modal
                    className="editor-item-modal"
                    visible={visible}
                    onCancel={this.handleModalVisible}
                    footer={null}
                    title={'Textures'}
                    width="75%"
                    style={{ height: '75%' }}
                >
                    <Textures onChange={this.handleChangeTexture} />
                </Modal>
            </>
        );
    }
}

export default TexturePicker;
