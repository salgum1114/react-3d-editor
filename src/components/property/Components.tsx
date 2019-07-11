import React, { Component } from 'react';
import { Entity } from 'aframe';
import { Collapse, Icon, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { capitalize } from '../../tools/UtilTools';
import FormRender from './FormRender';
import { generalComponents } from './GeneralComponent';
import { EventTools } from '../../tools';

interface IProps extends FormComponentProps {
    entity?: Entity;
}

class Components extends Component<IProps> {
    handleClick = (componentName: string) => {
        const { entity } = this.props;
        entity.removeAttribute(componentName);
        EventTools.emit('componentremove', {
            entity,
            component: componentName,
        });
    }

    render() {
        const { entity, form } = this.props;
        return (
            <Collapse accordion={true} bordered={false}>
                {
                    Object.keys(entity.components)
                    .filter(component => !generalComponents.some(comp => comp === component))
                    .map(key => {
                        const { schema, data } = entity.components[key] as any;
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
                                            onOk: () => this.handleClick(key),
                                        });
                                    }}
                                />
                                }
                            >
                                {
                                    Object.keys(schema).map(schemaKey => {
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
                    })
                }
            </Collapse>
        );
    }
}

export default Components;