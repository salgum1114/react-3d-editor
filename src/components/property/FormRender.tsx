import React, { Component } from 'react';
import { Form, Input, InputNumber, Switch, Col, Select, Row } from 'antd';
import { Entity } from 'aframe';
import { FormComponentProps } from 'antd/lib/form';

import { ColorPicker, TexturePicker } from '../common';
import { capitalize } from '../../tools/UtilTools';

interface IProps extends FormComponentProps {
    schema: any;
    entity?: Entity;
    data?: any;
    componentName?: string;
    schemaKey?: string;
}

class FormRender extends Component<IProps> {
    getComponent = () => {
        const { schema, data, form, entity, schemaKey, componentName } = this.props;
        if (schemaKey) {
            if (componentName === 'material' && (schemaKey === 'envMap' || schemaKey === 'src')) {
                return (
                    <TexturePicker
                        schema={schema}
                        data={data}
                        form={form}
                        entity={entity}
                        schemaKey={schemaKey}
                        componentName={componentName}
                    />
                );
            }
        }
        if (schemaKey === 'loop') {
            return <Switch />;
        }
        switch (schema.type) {
            case 'number':
                return <InputNumber />;
            case 'int':
                return <InputNumber />;
            case 'color':
                return <ColorPicker />;
            case 'boolean':
                return <Switch />;
            case 'string': {
                if (schema.oneOf && schema.oneOf.length) {
                    return (
                        <Select dropdownStyle={{ zIndex: 9999 }}>
                            {
                                schema.oneOf.map((type: string) => {
                                    return (
                                        <Select.Option key={type} value={type}>
                                            {capitalize(type)}
                                        </Select.Option>
                                    )
                                })
                            }
                        </Select>
                    )
                }
                return <Input />;
            }
            case 'map':
                return (
                    <TexturePicker
                        schema={schema}
                        data={data}
                        form={form}
                        entity={entity}
                        schemaKey={schemaKey}
                        componentName={componentName}
                    />
                );
            default:
                return <Input />;
        }
    }

    renderFormItem = () => {
        const { schema, data, form, entity, schemaKey, componentName } = this.props;
        switch (schema.type) {
            case 'vec2':
                return this.renderVec2FormItem();
            case 'vec3':
                return this.renderVec3FormItem();
            case 'vec4':
                return this.renderVec4FormItem();
            default:
                return (
                    <Form.Item key={schema.key} colon={false} label={capitalize(schemaKey) || capitalize(componentName)}>
                        {
                            form.getFieldDecorator(`${schemaKey ? `${componentName}.${schemaKey}` : componentName}`, {
                                valuePropName: schema.type === 'boolean' ? 'checked' : 'value',
                                initialValue: data,
                            })(this.getComponent())
                        }
                    </Form.Item>
                );
        }
    }

    renderVec2FormItem = () => {
        const { schema, data, form, entity, schemaKey, componentName } = this.props;
        return (
            <Form.Item colon={false} label={capitalize(schemaKey) || capitalize(componentName)}>
                {
                    Object.keys(schema.default).map(key => {
                        return (
                            <Col key={`${schemaKey ? `${componentName}.${schemaKey}` : componentName}.${key}`} span={12}>
                                <Form.Item>
                                    {
                                        form.getFieldDecorator(`${componentName}.${key}`, {
                                            initialValue: data[key],
                                        })(<InputNumber />)
                                    }
                                </Form.Item>
                            </Col>
                        );
                    })
                }
            </Form.Item>
        );
    }

    renderVec3FormItem = () => {
        const { schema, data, form, entity, schemaKey, componentName } = this.props;
        return (
            <Form.Item colon={false} label={capitalize(schemaKey) || capitalize(componentName)}>
                <Row gutter={8}>
                    {
                        Object.keys(schema.default).map(key => {
                            return (
                                <Col key={`${schemaKey ? `${componentName}.${schemaKey}` : componentName}.${key}`} md={24} lg={8}>
                                    <Form.Item>
                                        {
                                            form.getFieldDecorator(`${componentName}.${key}`, {
                                                initialValue: data[key],
                                            })(<InputNumber style={{ width: 'inherit' }} />)
                                        }
                                    </Form.Item>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Form.Item>
        );
    }

    renderVec4FormItem = () => {
        const { schema, data, form, entity, componentName, schemaKey } = this.props;
        return (
            <Form.Item colon={false} label={capitalize(schemaKey) || capitalize(componentName)}>
                <Row gutter={8}>
                    {
                        Object.keys(schema.default).map(key => {
                            return (
                                <Col key={`${schemaKey ? `${componentName}.${schemaKey}` : componentName}.${key}`} md={24} lg={6}>
                                    <Form.Item>
                                        {
                                            form.getFieldDecorator(`${componentName}.${key}`, {
                                                initialValue: data[key],
                                            })(<InputNumber style={{ width: 'inherit' }} />)
                                        }
                                    </Form.Item>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Form.Item>
        );
    }

    render() {
        const { entity } = this.props;
        if (entity) {
            return this.renderFormItem();
        }
        return null;
    }
}

export default FormRender;
