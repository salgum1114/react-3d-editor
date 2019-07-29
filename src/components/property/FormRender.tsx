import React, { Component } from 'react';
import { Form, Input, InputNumber, Switch, Col, Select, Row } from 'antd';
import { Entity } from 'aframe';
import { FormComponentProps } from 'antd/lib/form';

import { ColorPicker, TexturePicker, AudioPicker, VideoPicker, ImagePicker } from '../common';
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
        if (
            schema.type === 'model'
            || schema.type === 'file'
            || schema.type === 'map'
            || componentName === 'obj-model'
            || (componentName === 'material' && (schemaKey === 'envMap' || schemaKey === 'src'))
        ) {
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
            case 'audio':
                return (
                    <AudioPicker
                        schema={schema}
                        data={data}
                        form={form}
                        entity={entity}
                        schemaKey={schemaKey}
                        componentName={componentName}
                    />
                );
            case 'video':
                return (
                    <VideoPicker
                        schema={schema}
                        data={data}
                        form={form}
                        entity={entity}
                        schemaKey={schemaKey}
                        componentName={componentName}
                    />
                );
            case 'image':
                return (
                    <ImagePicker
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
        const { schema, data, form, schemaKey, componentName } = this.props;
        switch (schema.type) {
            case 'vec2':
                return this.renderVec2FormItem();
            case 'vec3':
                return this.renderVec3FormItem();
            case 'vec4':
                return this.renderVec4FormItem();
            default:
                const ckey = schemaKey ? `${componentName}.${schemaKey}` : componentName;
                return (
                    <Form.Item key={schema.key} colon={false} label={capitalize(schemaKey) || capitalize(componentName)}>
                        {
                            form.getFieldDecorator(`${ckey}`, {
                                valuePropName: schema.type === 'boolean' ? 'checked' : 'value',
                                initialValue: data,
                            })(this.getComponent())
                        }
                    </Form.Item>
                );
        }
    }

    renderVec2FormItem = () => {
        const { schema, data, form, schemaKey, componentName } = this.props;
        const ckey = schemaKey ? `${componentName}.${schemaKey}` : componentName;
        return (
            <Form.Item colon={false} label={capitalize(schemaKey) || capitalize(componentName)}>
                {
                    Object.keys(schema.default).map(key => {
                        return (
                            <Col key={`${ckey}.${key}`} span={12}>
                                <Form.Item>
                                    {
                                        form.getFieldDecorator(`${ckey}.${key}`, {
                                            initialValue: data && data[key],
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
        const { schema, data, form, schemaKey, componentName } = this.props;
        const ckey = schemaKey ? `${componentName}.${schemaKey}` : componentName;
        return (
            <Form.Item colon={false} label={capitalize(schemaKey) || capitalize(componentName)}>
                <Row gutter={8}>
                    {
                        Object.keys(schema.default).map(key => {
                            return (
                                <Col key={`${ckey}.${key}`} md={24} lg={8}>
                                    <Form.Item>
                                        {
                                            form.getFieldDecorator(`${ckey}.${key}`, {
                                                initialValue: data && data[key],
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
        const { schema, data, form, componentName, schemaKey } = this.props;
        const ckey = schemaKey ? `${componentName}.${schemaKey}` : componentName;
        return (
            <Form.Item colon={false} label={capitalize(schemaKey) || capitalize(componentName)}>
                <Row gutter={8}>
                    {
                        Object.keys(schema.default).map(key => {
                            return (
                                <Col key={`${ckey}.${key}`} md={24} lg={6}>
                                    <Form.Item>
                                        {
                                            form.getFieldDecorator(`${ckey}.${key}`, {
                                                initialValue: data && data[key],
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
