import React, { Component } from 'react';
import { Form, Divider, List } from 'antd';
import { Entity } from 'aframe';
import { FormComponentProps } from 'antd/lib/form';
import debounce from 'lodash/debounce';

import GeneralComponent from './GeneralComponent';
import AddComponent from './AddComponent';
import Components from './Components';
import { EntityTools } from '../../tools';
import { Scrollbar } from '../common';

interface IProps extends FormComponentProps {
    entity?: Entity;
};

class Property extends Component<IProps> {
    componentWillReceiveProps(nextProps: IProps) {
        const { entity: nextEntity, form } = nextProps;
        const { entity: currentEntity } = this.props;
        if ((nextEntity && currentEntity) && (nextEntity.id !== currentEntity.id)) {
            form.resetFields();
        }
    }

    render() {
        const { entity, form } = this.props;
        return entity ? (
            <Scrollbar>
                <Form style={{ display: 'flex', flexDirection: 'column' }}>
                    <GeneralComponent entity={entity} form={form} />
                    <AddComponent entity={entity} />
                    <Components entity={entity} form={form} />
                </Form>
            </Scrollbar>
        ) : <List />
    }
}

const updateEntity = debounce((entity, propertyName, value) => EntityTools.updateEntity(entity, propertyName, value), 200);

export default Form.create({
    onValuesChange: (props: IProps, changedValues: any, allValues: any) => {
        const { entity } = props;
        if (entity) {
            const changedComponentName = Object.keys(changedValues)[0];
            const { schema, isSingleProp } = AFRAME.components[changedComponentName] as any;
            if (!isSingleProp) {
                const changedSchemaKey = Object.keys(changedValues[changedComponentName])[0];
                if (schema[changedSchemaKey]) {
                    const newSchema = schema[changedSchemaKey];
                    const changedSchema = allValues[changedComponentName];
                    const value = newSchema.stringify(changedSchema[changedSchemaKey]);
                    const propertyName = `${changedComponentName}.${changedSchemaKey}`;
                    updateEntity(entity, propertyName, value);
                } else {
                    const changedSchema = allValues[changedComponentName];
                    const value = changedSchema[changedSchemaKey];
                    const propertyName = `${changedComponentName}.${changedSchemaKey}`;
                    updateEntity(entity, propertyName, value);
                }
                return;
            }
            const value = schema.stringify(allValues[changedComponentName]);
            updateEntity(entity, changedComponentName, value);
        }
    },
})(Property);
