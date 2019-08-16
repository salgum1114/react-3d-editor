import React, { PureComponent } from 'react';
import { Modal, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Entity } from 'aframe';
import debounce from 'lodash/debounce';
import { DataSourceItemType } from 'antd/lib/auto-complete';

import Textures, { ITexture } from './Textures';
import { AssetTools, EventTools } from '../../tools';
import AutoComplete from './AutoComplete';

interface IProps extends FormComponentProps {
    schema: any;
    entity?: Entity;
    data?: any;
    componentName?: string;
    schemaKey?: string;
    onChange?: (value?: any) => void;
    prefixUrl?: boolean;
    baseUrl?: boolean;
}

interface IState {
    value?: string;
    visible?: boolean;
    assets: DataSourceItemType[];
}

class TexturePicker extends PureComponent<IProps, IState> {
    state: IState = {
        value: this.props.data instanceof HTMLElement ? this.props.data.id : (this.props.data || ''),
        visible: false,
        assets: [],
    }

    componentDidMount() {
        this.setAssets();
        EventTools.on('assetcreate', () => {
            this.setAssets();
        });
        EventTools.on('assetremove', () => {
            this.setAssets();
        });
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.entity.id !== this.props.entity.id) {
            this.setState({
                value: nextProps.data instanceof HTMLElement ? nextProps.data.id : (nextProps.data || ''),
            });
        }
    }

    /**
     * @description Set the assets for autocomplete
     */
    private setAssets = (): void => {
        const { schemaKey, componentName } = this.props;
        this.setState({
            assets: AssetTools.buildAssets(AFRAME.INSPECTOR.sceneEl, ['a-mixin'])
            .filter(asset => {
                if (componentName === 'file') {
                    return true;
                } else if ((componentName === 'obj-model' || componentName === 'gltf-model') && asset.type === 'a-asset-item') {
                    return true;
                } else if (componentName === 'material' && (asset.type === 'img' || asset.type === 'video')) {
                    return true;
                } else if (componentName === 'sound' && asset.type === 'audio')  {
                    return true;
                }
                return false;
            })
            .map(asset => {
                return {
                    value: asset.key.toString(),
                    text: asset.title.toString(),
                };
            }),
        });
    }

    /**
     * @description Get etity type
     * @param {Entity} entity
     * @param {string} componentName
     * @param {string} schemaKey
     * @returns {string | undefined}
     */
    private getType = (entity: Entity, componentName: string, schemaKey: string) => {
        let type;
        if (entity.tagName.toLowerCase() === 'img') {
            type = 'image';
        } else if (entity.tagName.toLowerCase() === 'video') {
            type = 'video';
        } else if (entity.tagName.toLowerCase() === 'audio') {
            type = 'audio';
        } else if (componentName === 'sound') {
            type = 'audio';
        } else if (componentName === 'material') {
            type = 'image/video';
        } else if (componentName === 'obj-model' || componentName === 'gltf-model') {
            type = 'etc';
        }
        return type;
    }

    /**
     * @description
     * @param {ITexture} texture
     */
    private handleClickTexture = (texture: ITexture) => {
        const { onChange, entity, prefixUrl = true, baseUrl = true, componentName } = this.props;
        const setValue = (value: string) => {
            if (entity.tagName.toLowerCase() === 'a-asset-item'
            || entity.tagName.toLowerCase() === 'a-mixin' && componentName === 'sound'
            || componentName === 'gltf-model') {
                onChange(value);
            } else {
                onChange(prefixUrl ? `url(${value})` : value);
            }
            this.setState({
                value,
            });
            this.handleModalVisible();
        }
        if (onChange) {
            const tagName = entity.tagName.toLowerCase();
            if (tagName === 'a-mixin' && (componentName === 'obj-model' || componentName === 'gltf-model' || componentName === 'sound')
            || tagName === 'a-asset-item') {
                setValue(texture.url);
                return;
            }
            if (baseUrl) {
                const reader = new FileReader();
                reader.readAsDataURL(texture.file);
                reader.onload = () => {
                    const url = reader.result as string;
                    setValue(url);
                };
            } else {
                setValue(texture.url);
            }
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
    private handleChangeSrc = (value: any) => {
        this.debouncedChangeSrc(value);
        this.setState({
            value,
        });
    }

    /**
     * @description Debounce value
     * @param {*} value
     */
    private debouncedChangeSrc = debounce((value: any) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(value);
        }
    }, 200)

    /**
     * @description  Select the asset in registration assets
     * @param {*} value
     */
    private handleSelectSrc = (value: any) => {
        const assetItem = document.getElementById(value);
        if (assetItem) {
            this.debouncedChangeSrc(`#${value}`);
        }
    }

    render() {
        const { entity, schemaKey, componentName } = this.props;
        const { visible, value, assets } = this.state;
        return (
            <>
                <AutoComplete
                    onChange={this.handleChangeSrc}
                    onSelect={this.handleSelectSrc}
                    value={value.length > 100 ? value.substring(0, 100).concat('...') : value}
                    dataSource={(entity.object3D || entity.tagName.toLowerCase() === 'a-mixin') && assets}
                    filterOption={(inputValue, option: any) =>
                        option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                    addonAfter={<Icon type="shop" onClick={this.handleModalVisible} />}
                />
                <Modal
                    className="editor-item-modal"
                    visible={visible}
                    onCancel={this.handleModalVisible}
                    footer={null}
                    title={'Textures'}
                    width="75%"
                    style={{ height: '75%' }}
                >
                    <Textures onClick={this.handleClickTexture} type={this.getType(entity, componentName, schemaKey)} />
                </Modal>
            </>
        );
    }
}

export default TexturePicker;
