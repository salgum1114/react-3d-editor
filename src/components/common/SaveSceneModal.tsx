import React, { Component } from 'react';
import { Form, Modal, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { ISavedScene } from './SavedList';

interface IProps extends FormComponentProps {
    onOk: (savedScene: ISavedScene) => void;
    onCancel: () => void;
    visible: boolean;
}

class SaveSceneModal extends Component<IProps> {
    private handleSaveScene = () => {
        const { onOk, form } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            onOk(values);
        });
    }

    render() {
        const { form, visible, onCancel } = this.props;
        return (
            <Modal
                title={'Save scene'}
                visible={visible}
                onOk={this.handleSaveScene}
                onCancel={onCancel}
            >
                <Form colon={false}>
                    <Form.Item label={'Name'}>
                        {
                            form.getFieldDecorator('name', {
                                rules: [
                                    { required: true },
                                ],
                            })(<Input placeholder={'Input scene name'} />)
                        }
                    </Form.Item>
                    <Form.Item label={'Description'}>
                        {
                            form.getFieldDecorator('description')
                            (<Input.TextArea placeholder={'Input scene description'} />)
                        }
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create<IProps>()(SaveSceneModal);
