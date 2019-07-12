import React, { Component } from 'react';
import { Select, Modal, Input } from 'antd';
import { Entity } from 'aframe';

import { EventTools } from '../../tools';
import { generalComponents } from './GeneralComponent';
import { capitalize } from '../../tools/UtilTools';

interface IProps {
    entity?: Entity;
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
        this.handleAddComponent(value);
    }

    handleAddComponent = (componentId: string) => {
        const { entity } = this.props;
        entity.setAttribute(componentId, '');
        EventTools.emit('componentadd', {
            entity,
            component: componentId,
        });
    }

    render() {
        const { entity } = this.props;
        return (
            <div style={{ display: 'flex', justifyContent: 'center', margin: 16 }}>
                <Select dropdownStyle={{ zIndex: 9999 }} placeholder={'Add Component'} onSelect={this.handleSelect}>
                    {
                        Object.keys(AFRAME.components)
                        .filter(componentName => {
                            if (AFRAME.components[componentName].multiple) {
                                return true;
                            }
                            return !Object.keys(entity.components).concat(generalComponents).some(comp => comp === componentName);
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
