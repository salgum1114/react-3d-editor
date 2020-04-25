import React, { Component } from 'react';
import { Icon, Button, Radio } from 'antd';
import uuid from 'uuid';
import QRCode from 'qrcode';
import debounce from 'lodash/debounce';
import warning from 'warning';

import AutoComplete from './AutoComplete';
import CreateMarkerForm from './CreateMarkerForm';
import ARPatternFile from '../../lib/ARPatternFile';
import InputScript from './InputScript';

export interface CreateMarkerProps {
    onSave?: (marker: any) => void;
    onCancel?: () => void;
    visible?: boolean;
}

interface IState {
    imageURL: string;
    innerImageURL: string;
    markerType: string;
}

class CreateMarker extends Component<CreateMarkerProps, IState> {
    formRef: any;

    state: IState = {
        imageURL: '',
        innerImageURL: '',
        markerType: 'image',
    }

    private debouncedChangeImageURL = debounce((value: string) => {
        const { form } = this.formRef.props;
        form.validateFields((err: any, values: any) => {
            if (err) {
                return;
            }
            this.handleChangeForm(values);
        });
    }, 200)

    /**
     * @description Clear form
     */
    private handleClear = () => {
        const { form } = this.formRef.props;
        form.resetFields();
        this.setState({
            imageURL: '',
            innerImageURL: '',
        });
    }

    /**
     * @description Choose image
     */
    private handleChooseImage = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.hidden = true;
        input.onchange = (e: any) => {
            const { files } = e.target;
            const file = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.setState({
                    innerImageURL: reader.result as string,
                }, () => {
                    const { form } = this.formRef.props;
                    form.validateFields((err: any, values: any) => {
                        if (err) {
                            return;
                        }
                        this.handleChangeForm(values);
                    });
                });
            };
        };
        document.body.appendChild(input);
        input.click();
        input.remove();
    }

    /**
     * @description Change input URL
     * @param {*} imageURL
     */
    private handleChangeImageURL = (innerImageURL: any) => {
        const { markerType } = this.state;
        if (markerType === 'qrcode') {
            QRCode.toDataURL(innerImageURL, { margin: 0, width: 512 }).then(url => {
                this.setState({
                    innerImageURL: url,
                });
                this.debouncedChangeImageURL(url);
            }).catch(error => {
                warning(true, error);
            });
        } else {
            this.debouncedChangeImageURL(innerImageURL);
            this.setState({
                innerImageURL,
            });
        }
    }

    /**
     * @description Save marker
     */
    private handleSave = () => {
        const { form } = this.formRef.props;
        const { onSave } = this.props;
        form.validateFields((err: any, values: any) => {
            if (err) {
                return;
            }
            const { innerImageURL, imageURL } = this.state;
            if (!innerImageURL.length) {
                return;
            }
            if (onSave) {
                ARPatternFile.encodeImageURL(innerImageURL, patternFileString => {
                    onSave({
                        ...values,
                        id: uuid(),
                        name: `${values.name}.patt`,
                        title: values.name,
                        thumbnail: imageURL,
                        pattern: new Blob([patternFileString], { type: 'text/plain' }),
                    });
                });
            }
        });
    }

    /**
     * @description Change form
     * @param {*} values
     */
    private handleChangeForm = (values: any) => {
        const { innerImageURL } = this.state;
        const { patternRatio, imageSize, borderColor } = values;
        ARPatternFile.buildFullMarker(innerImageURL, patternRatio, imageSize, borderColor, (imageURL: string) => {
            this.setState({
                imageURL,
            });
        });
    }

    render() {
        const { onCancel, visible } = this.props;
        const { imageURL, markerType } = this.state;
        return (
            <div style={{ overflowX: 'hidden', width: visible ? 360 : 0, transition: 'width 0.3s', borderLeft: visible ? '1px solid rgba(0, 0, 0, 0.1)' : 0 }}>
                <div className="editor-picker">
                    <div className="editor-picker-form">
                        <Radio.Group onChange={e => { this.setState({ markerType: e.target.value }); }} value={markerType} style={{ marginBottom: 8 }}>
                            <Radio.Button style={{ width: '50%', textAlign: 'center' }} value="image">{'Image'}</Radio.Button>
                            <Radio.Button style={{ width: '50%', textAlign: 'center' }} value="qrcode">{'QR Code'}</Radio.Button>
                        </Radio.Group>
                        {
                            markerType === 'image' ? (
                                <AutoComplete
                                    onChange={this.handleChangeImageURL}
                                    value={imageURL.length > 100 ? imageURL.substring(0, 100).concat('...') : imageURL}
                                    addonAfter={<Icon type="shop" onClick={this.handleChooseImage} />}
                                />
                            ) : (
                                <InputScript onChange={value => { this.handleChangeImageURL(value); }} />
                            )
                        }
                    </div>
                    <div className="editor-picker-preview">
                        <div className="editor-picker-container">
                            <img src={imageURL} alt="" />
                        </div>
                    </div>
                    <div className="editor-picker-actions">
                        <CreateMarkerForm wrappedComponentRef={(form: any) => this.formRef = form} onChange={this.handleChangeForm} />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button style={{ marginRight: 8 }} onClick={this.handleClear}>{'Clear'}</Button>
                            <Button style={{ marginRight: 8 }} onClick={onCancel}>{'Cancel'}</Button>
                            <Button style={{ marginLeft: 8 }} type="primary" onClick={this.handleSave}>{'Save'}</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateMarker;
