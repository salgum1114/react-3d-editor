import React, { PureComponent } from 'react';
import { Form, Select } from 'antd';

import { EventTools } from '../../tools';
import { Entity } from 'aframe';

interface IMixin {
    key: string | number;
    label: string;
}

interface IProps {
    entity?: Entity;
}

interface IState {
    mixins: IMixin[];
    selectedItems: IMixin[];
}

class Mixins extends PureComponent<IProps, IState> {
    state: IState = {
        mixins: [],
        selectedItems: [],
    }

    componentDidMount() {
        this.buildMixins(this.props.entity);
        EventTools.on('assetcreate', () => {
            this.buildMixins(this.props.entity);
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps: IProps) {
        this.buildMixins(nextProps.entity);
    }

    getMixins = (selectedItems: IMixin[]) => {
        return Array.from(document.querySelectorAll('a-mixin'))
        .map(mixin => {
            return {
                key: mixin.id,
                label: mixin.getAttribute('title') || mixin.id,
            };
        })
        .filter(mixin => !selectedItems.some((item: IMixin) => item.key === mixin.key));
    }

    buildMixins = (entity: any) => {
        if (entity) {
            const selectedItems = entity.mixinEls.map((mixin: Entity) => ({
                key: mixin.id,
                label: mixin.getAttribute('title') || mixin.id,
            }));
            this.setState({
                selectedItems,
                mixins: this.getMixins(selectedItems),
            });
        }
    }

    handleUpdateMixin = (selectedItems: IMixin[]) => {
        const { entity } = this.props;
        const value = selectedItems.map(item => item.key).join(' ');
        entity.setAttribute('mixin', value);
        EventTools.emit('entityupdate', {
            component: 'mixin',
            entity,
            property: '',
            value,
        });
        this.setState({
            selectedItems,
            mixins: this.getMixins(selectedItems),
        });
    }

    render() {
        const { mixins, selectedItems } = this.state;
        return (
            <Form.Item label={'Mixins'}>
                <Select
                    placeholder={'Select the mixin'}
                    value={selectedItems}
                    mode="multiple"
                    labelInValue={true}
                    onChange={this.handleUpdateMixin}
                    optionFilterProp="children"
                    filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {
                        mixins.map(mixin => {
                            return (
                                <Select.Option key={mixin.key} value={mixin.key}>
                                    {mixin.label}
                                </Select.Option>
                            );
                        })
                    }
                </Select>
            </Form.Item>
        );
    }
}

export default Mixins;
