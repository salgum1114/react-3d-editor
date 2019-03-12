import React, { Component } from 'react';
import { Select } from 'antd';
import { Entity } from 'aframe';

import { EventTools } from '../../tools';
import { generalComponents } from './GeneralComponent';
import { capitalize } from '../../tools/UtilTools';

interface IProps {
    entity?: Entity;
}

class AddComponent extends Component<IProps> {
    handleSelect = (value: any) => {
        const { entity } = this.props;
        entity.setAttribute(value, '');
        EventTools.emit('componentadd', {
            entity,
            component: value,
        });
    }

    render() {
        const { entity } = this.props;
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Select dropdownStyle={{ zIndex: 9999 }} placeholder={'Add Component'} onSelect={this.handleSelect}>
                    {
                        Object.keys(AFRAME.components)
                        .filter(component => !Object.keys(entity.components).concat(generalComponents).some(comp => comp === component))
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
