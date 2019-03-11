import React, { Component } from 'react';
import { Select } from 'antd';
import { Entity } from 'aframe';

interface IProps {
    entity?: Entity;
}

class AddComponent extends Component<IProps> {
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Select dropdownStyle={{ zIndex: 9999 }} placeholder={'Add Component'}>
                    {
                        Object.keys(AFRAME.components).map((componentName: string) => {
                            return (
                                <Select.Option key={componentName} value={componentName}>
                                    {componentName}
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
