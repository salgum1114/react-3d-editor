import React, { Component } from 'react';
import { Entity } from 'aframe';
import { Collapse } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { capitalize } from '../../tools/UtilTools';
import FormRender from './FormRender';
import { generalComponents } from './GeneralComponent';

interface IProps extends FormComponentProps {
    entity?: Entity;
}

class Components extends Component<IProps> {
    render() {
        const { entity, form } = this.props;
        return (
            <div>
                <Collapse accordion={true}>
                    {
                        Object.keys(entity.components)
                        .filter(component => !generalComponents.some(comp => comp === component))
                        .map(key => {
                            const { schema, data } = entity.components[key] as any;
                            return (
                                <Collapse.Panel key={key} header={capitalize(key)}>
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
            </div>
        );
    }
}

export default Components;