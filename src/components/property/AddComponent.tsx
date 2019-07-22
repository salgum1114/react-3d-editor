import React, { Component } from 'react';
import { Select, Modal, Input } from 'antd';
import { Entity } from 'aframe';

import { EntityTools } from '../../tools';
import { capitalize } from '../../tools/UtilTools';
import { GeneralComponentType } from '../../constants/components/components';

interface IProps {
    entity?: Entity;
    generalComponents?: GeneralComponentType[];
}

interface IState {
    componentId?: string;
}

class AddComponent extends Component<IProps, IState> {
    state: IState = {
        componentId: '',
    }

    handleSelect = (value: any) => {
        const { entity } = this.props;
        if (entity.components) {
            if (entity.components[value]) {
                Modal.info({
                    title: 'Please input ID for the component',
                    content: (
                        <Input onChange={e => { this.setState({ componentId: e.target.value })}} />
                    ),
                    onOk: () => this.state.componentId.length ? this.handleAddComponent(`${value}__${this.state.componentId}`) : null,
                });
                return;
            }
        } else {
            if (entity.hasAttribute(value)) {
                Modal.info({
                    title: 'Please input ID for the component',
                    content: (
                        <Input onChange={e => { this.setState({ componentId: e.target.value })}} />
                    ),
                    onOk: () => this.state.componentId.length ? this.handleAddComponent(`${value}__${this.state.componentId}`) : null,
                });
                return;
            }
        }
        this.handleAddComponent(value);
    }

    handleAddComponent = (componentId: string) => {
        const { entity } = this.props;
        EntityTools.addComponent(entity, componentId);
    }

    render() {
        const { entity, generalComponents } = this.props;
        return (
            <div style={{ display: 'flex', justifyContent: 'center', margin: 16 }}>
                <Select
                    showSearch={true}
                    dropdownStyle={{ zIndex: 9999 }}
                    placeholder={'Add Component'}
                    onSelect={this.handleSelect}
                    optionFilterProp="children"
                    filterOption={(input, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {
                        Object.keys(AFRAME.components)
                        .filter(componentName => {
                            if (AFRAME.components[componentName].multiple) {
                                return true;
                            }
                            if (entity.components) {
                                return !Object.keys(entity.components).concat(generalComponents).some(comp => comp === componentName);
                            } else {
                                if (entity.hasAttribute(componentName)) {
                                    return false;
                                }
                                return true;
                            }
                        })
                        .map((componentName: string) => {
                            return (
                                <Select.Option key={componentName} value={componentName}>
                                    {capitalize(componentName)}
                                </Select.Option>
                            )
                        })
                    }
                </Select>
            </div>
        );
    }
}

export default AddComponent;
