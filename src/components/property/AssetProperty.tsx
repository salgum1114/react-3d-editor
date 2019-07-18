import React, { Component } from 'react';
import { Entity } from 'aframe';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { Empty } from '../common';
import GeneralComponent from './GeneralComponent';
import AddComponent from './AddComponent';

interface IProps extends FormComponentProps {
    entity?: Entity;
}

class AssetProperty extends Component<IProps> {
    render() {
        const { form, entity } = this.props;
        console.log();
        return entity ? (
            <Form>
                <GeneralComponent form={form} entity={entity} generalComponents={['name']} />
                {entity.tagName.toLowerCase() === 'a-mixin' && <AddComponent form={form} entity={entity} generalComponents={['name']} />}
            </Form>
        ) : <Empty />;
    }
}

export default Form.create({
    onValuesChange: (props: IProps, changedValues: any, allValues: any) => {

    },
})(AssetProperty);
