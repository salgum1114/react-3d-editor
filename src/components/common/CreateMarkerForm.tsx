import React, { Component } from 'react';
import { Form, Slider, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import ColorPicker from './ColorPicker';

interface IProps extends FormComponentProps {
    onChange?: (values: any) => void;
}

class CreateMarkerForm extends Component<IProps> {
    render() {
        const { form } = this.props;
        return (
            <Form colon={false}>
                <Form.Item label={'Name'}>
                    {
                        form.getFieldDecorator('name', {
                            initialValue: 'pattern-marker',
                        })(<Input />)
                    }
                </Form.Item>
                <Form.Item label={'Pattern Ratio'}>
                    {
                        form.getFieldDecorator('patternRatio', {
                            initialValue: 0.5,
                        })(<Slider step={0.01} min={0.10} max={0.90} />)
                    }
                </Form.Item>
                <Form.Item label={'Image Size'}>
                    {
                        form.getFieldDecorator('imageSize', {
                            initialValue: 512,
                        })(<Slider min={150} max={2500} />)
                    }
                </Form.Item>
                <Form.Item label={'Border Color'}>
                    {
                        form.getFieldDecorator('borderColor', {
                            initialValue: '#fff',
                        })(<ColorPicker />)
                    }
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create<IProps>({
    onValuesChange: (props: IProps, changedValues, allValues) => {
        const { onChange } = props;
        if (onChange) {
            onChange(allValues);
        }
    },
})(CreateMarkerForm);
