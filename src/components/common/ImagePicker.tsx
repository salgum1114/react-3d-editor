import React, { Component } from 'react';
import TexturePicker from './TexturePicker';
import { Entity } from 'aframe';

interface IProps {
    schema: any;
    entity?: Entity;
    data?: any;
    componentName?: string;
    schemaKey?: string;
    onChange?: (value?: any) => void;
}

class ImagePicker extends Component<IProps> {
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
                    />
                </div>
                <div className="editor-picker-preview">
                    <div className="editor-picker-img-container">
                        <img src={data} alt="" />
                    </div>
                </div>
            </div>
        );
    }
}

export default ImagePicker;
