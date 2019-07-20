import React, { PureComponent } from 'react';
import { Form, Select } from 'antd';

import { EventTools } from '../../tools';
import { Entity } from 'aframe';

interface IMixin {
    id: string | number;
    title: string;
}

interface IProps {
    entity?: Entity;
}

interface IState {
    mixins: IMixin[];
    selectedItems: string[];
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

    componentWillReceiveProps(nextProps: IProps) {
        this.buildMixins(nextProps.entity);
    }

    getMixins = (selectedItems: string[]) => {
        return Array.from(document.querySelectorAll('a-mixin'))
        .map(mixin => {
            return {
                id: mixin.id,
                title: mixin.getAttribute('title') || mixin.getAttribute('name'),
            };
        })
        .filter(mixin => selectedItems.indexOf(mixin.id) === -1);
    }

    buildMixins = (entity: Entity) => {
        if (entity) {
            const selectedItems = entity.hasAttribute('mixin') ? entity.getAttribute('mixin').split(' ') : [];
            this.setState({
                selectedItems,
                mixins: this.getMixins(selectedItems),
            });
        }
    }

    handleUpdateMixin = (selectedItems: string[]) => {
        const { entity } = this.props;
        const value = selectedItems.map(item => item).join(' ');
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
                    onChange={this.handleUpdateMixin}
                >
                    {
                        mixins.map(mixin => {
                            return (
                                <Select.Option key={mixin.id} value={mixin.id}>
                                    {mixin.title}
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
