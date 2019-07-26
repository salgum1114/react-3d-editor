import React, { Component } from 'react';
import { Entity } from 'aframe';
import { Collapse, Icon, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { capitalize } from '../../tools/UtilTools';
import FormRender from './FormRender';
import { EntityTools } from '../../tools';
import { GeneralComponentType } from '../../constants/components/components';
import AssetComponents from '../../constants/assets/components';
import { ComponentNames } from '../../constants/assets/components/components';
import AssetSchema from '../../constants/assets';

interface IProps extends FormComponentProps {
    entity?: Entity;
    generalComponents?: GeneralComponentType[];
    type: string;
}

class Components extends Component<IProps> {
    /**
     * @description Remove component
     * @param {string} componentName
     */
    handleRemoveComponent = (componentName: string) => {
        const { entity } = this.props;
        EntityTools.removeComponent(entity, componentName);
    }

    render() {
        const { entity, form, type, generalComponents } = this.props;
        return (
            <Collapse accordion={true} bordered={false}>
                {
                    entity.components ? Object.keys(entity.components)
                    .filter(component => !generalComponents.some(comp => comp === component))
                    .map(key => {
                        const { schema, data, isSingleProperty } = entity.components[key] as any;
                        return (
                            <Collapse.Panel
                                key={key}
                                header={capitalize(key)}
                                extra={
                                    <Icon
                                        type="close"
                                        onClick={(e: React.MouseEvent) => {
                                            e.stopPropagation();
                                            Modal.confirm({
                                                title: 'Remove component',
                                                content: `Do you really want to remove component ${key}?`,
                                                onOk: () => this.handleRemoveComponent(key),
                                            });
                                        }}
                                    />
                                }
                            >
                                {
                                    isSingleProperty ? (
                                        <FormRender
                                            entity={entity}
                                            componentName={key}
                                            data={data}
                                            schema={schema}
                                            form={form}
                                        />
                                    ) : Object.keys(schema).map(schemaKey => {
                                        const componentData = data[schemaKey];
                                        const componentShcema = schema[schemaKey];
                                        return (
                                            <FormRender
                                                key={schemaKey}
                                                entity={entity}
                                                componentName={key}
                                                data={componentData}
                                                schemaKey={schemaKey}
                                                schema={componentShcema}
                                                form={form}
                                            />
                                        );
                                    })
                                }
                            </Collapse.Panel>
                        );
                    }) : type === 'entity' ? Object.keys(AssetComponents)
                    .filter(component => entity.hasAttribute(component))
                    .filter(component => !generalComponents.some(comp => comp === component))
                    .map(key => {
                        const { schema, isSingleProp } = AssetComponents[key as ComponentNames];
                        const AframeComponent = AFRAME.components[key] as any;
                        let data = entity.getAttribute(key);
                        if (isSingleProp && AframeComponent && AframeComponent.schema) {
                            data = AframeComponent.schema.parse(data);
                        }
                        return (
                            <Collapse.Panel
                                key={key}
                                header={capitalize(key)}
                                extra={
                                    <Icon
                                        type="close"
                                        onClick={(e: React.MouseEvent) => {
                                            e.stopPropagation();
                                            Modal.confirm({
                                                title: 'Remove component',
                                                content: `Do you really want to remove component ${key}?`,
                                                onOk: () => this.handleRemoveComponent(key),
                                            });
                                        }}
                                    />
                                }
                            >
                                {
                                    isSingleProp ? (
                                        <FormRender
                                            entity={entity}
                                            componentName={key}
                                            data={data}
                                            schema={schema}
                                            form={form}
                                        />
                                    ) : Object.keys(schema).map(schemaKey => {
                                        const componentData = data[schemaKey];
                                        const componentShcema = schema[schemaKey];
                                        return (
                                            <FormRender
                                                key={schemaKey}
                                                entity={entity}
                                                componentName={key}
                                                data={componentData}
                                                schemaKey={schemaKey}
                                                schema={componentShcema}
                                                form={form}
                                            />
                                        );
                                    })
                                }
                            </Collapse.Panel>
                        );
                    }) : AssetSchema[entity.tagName.toLowerCase()].map((schemaKey: ComponentNames) => {
                        const { schema } = AssetComponents[schemaKey];
                        const data = entity.getAttribute('src');
                        return (
                            <Collapse.Panel
                                key={'src'}
                                header={capitalize(schemaKey)}
                            >
                                <FormRender
                                    entity={entity}
                                    componentName={'src'}
                                    data={data}
                                    schema={schema}
                                    form={form}
                                />
                            </Collapse.Panel>
                        );
                    })
                }
            </Collapse>
        );
    }
}

export default Components;
