import React, { Component } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Entity } from 'aframe';

import TexturePicker from './TexturePicker';

interface IProps extends FormComponentProps {
    schema: any;
    entity?: Entity;
    data?: any;
    componentName?: string;
    schemaKey?: string;
    onChange?: (value?: any) => void;
}

class AudioPicker extends Component<IProps> {
    render() {
        const { schema, data, form, entity, schemaKey, componentName, onChange } = this.props;
        return (
            <div className="editor-picker">
                <div className="editor-picker-form">
                    <TexturePicker
                        schema={schema}
                        data={data}
                        form={form}
                        entity={entity}
                        schemaKey={schemaKey}
                        componentName={componentName}
                        onChange={onChange}
                        prefixUrl={entity.tagName.toLowerCase() !== 'audio'}
                        baseUrl={entity.tagName.toLowerCase() !== 'audio'}
                    />
                </div>
                <div className="editor-picker-preview">
                    <div className="editor-picker-container">
                        <audio src={data} controls={true} />
                    </div>
                </div>
            </div>
        );
    }
}

export default AudioPicker;
