import Icon from 'polestar-icons';
import React, { Component } from 'react';
import { Spin, Row, Col, Card, Button, Input, Select } from 'antd';
import isEmpty from 'lodash/isEmpty';

import AddEmpty from './AddEmpty';
import Scrollbar from './Scrollbar';
import Empty from './Empty';
import { formatTime, formatBytes, b64toBlob } from '../../tools/UtilTools';
import database from '../../database';

export interface ITexture {
    id: string;
    url: string;
    name: string;
    type: string;
    size: number;
    width?: number;
    height?: number;
    duration?: number;
}

type FilterType = 'all' | 'image' | 'video' | 'audio' | 'image/video' | string;

interface IProps {
    onChange?: (value?: any) => void;
    type?: FilterType;
}

interface IState {
    textures: ITexture[];
    loading: boolean;
    searchTexture: string;
    selectedFilterType: FilterType;
}

class Textures extends Component<IProps, IState> {
    state: IState = {
        textures: [],
        loading: false,
        searchTexture: '',
        selectedFilterType: 'all',
    }

    componentDidMount() {
        this.setState({
            loading: true,
        });
        database.save({
            _id: 'images',
        });
        database.getById('images').then(response => {
            const filelist = {} as FileList;
            if (isEmpty(response._attachments)) {
                this.setState({
                    loading: false,
                });
            } else {
                Object.keys(response._attachments).forEach((key, index) => {
                    const attachment = response._attachments[key];
                    if (attachment instanceof Blob) {
                        filelist[index] = new File([attachment.data], key, { type: attachment.content_type });
                    } else {
                        filelist[index] = new File([b64toBlob(attachment.data)], key, { type: attachment.content_type });
                    }
                });
                this.handleAppendTexture(filelist, false);
            }
        }).catch(() => {
            this.setState({
                loading: false,
            });
        });
    }

    /**
     * @description Handle file chooser in input element
     */
    private handleAddTexture = () => {
        const { textures, selectedFilterType } = this.state;
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        if (!textures.length) {
            input.setAttribute('accept', '*');
        } else {
            if (selectedFilterType === 'image') {
                input.setAttribute('accept', 'image/*');
            } else if (selectedFilterType === 'video') {
                input.setAttribute('accept', 'video/*');
            } else if (selectedFilterType === 'audio') {
                input.setAttribute('accept', 'audio/*');
            } else {
                input.setAttribute('accept', '*');
            }
        }
        input.setAttribute('multiple', true);
        input.hidden = true;
        input.onchange = (e: any) => {
            this.setState({
               loading: true,
            }, () => {
                this.handleAppendTexture(e.target.files);
            });
        };
        document.body.appendChild(input); // required for firefox
        input.click();
        input.remove();
    }

    /**
     * @description Append textures
     * @param {FileList} files
     * @param {boolean} [save=true]
     */
    private handleAppendTexture = (files: FileList, save: boolean = true) => {
        const length = Object.keys(files).length;
        if (save) {
            const doc = Object.keys(files).reduce((prev, key) => {
                const file = files[parseInt(key, 10)];
                return Object.assign(prev, {
                    _attachments: Object.assign(prev._attachments, {
                        [file.name]: {
                            content_type: file.type,
                            data: file,
                        },
                    }),
                });
            }, { _id: 'images', _attachments: {} });
            database.bulkBlobs(doc).catch(error => {
                this.setState({
                    loading: false,
                });
                throw new Error(error);
            });
        }
        Object.keys(files).forEach((value: string, index: number) => {
            const file = files[parseInt(value, 10)]
            const reader = new FileReader();
            reader.onloadend = () => {
                const url = reader.result as string;
                // const blobUrl = window.URL.createObjectURL(file);
                console.log(file);
                if (file.type.includes('image')) {
                    const image = new Image();
                    image.src = url;
                    image.onload = () => {
                        const texture: ITexture = {
                            id: file.name,
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            width: image.width,
                            height: image.height,
                            url,
                        };
                        this.setState({
                            textures: this.state.textures.concat(texture),
                        });
                    }
                } else if (file.type.includes('video')) {
                    const video = document.createElement('video') as HTMLVideoElement;
                    video.src = url;
                    video.onloadedmetadata = () => {
                        const texture: ITexture = {
                            id: file.name,
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            width: video.videoWidth,
                            height: video.videoHeight,
                            url,
                            duration: video.duration,
                        };
                        this.setState({
                            textures: this.state.textures.concat(texture),
                        });
                    };
                } else if (file.type.includes('audio')) {
                    const audio = new Audio();
                    audio.src = url;
                    audio.onloadedmetadata = () => {
                        const texture: ITexture = {
                            id: file.name,
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            url,
                            duration: audio.duration,
                        };
                        this.setState({
                            textures: this.state.textures.concat(texture),
                        });
                    }
                } else {
                    const texture: ITexture = {
                        id: file.name,
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        url,
                    };
                    this.setState({
                        textures: this.state.textures.concat(texture),
                    });
                }
                if (length === index + 1) {
                    this.setState({
                        loading: false,
                    });
                }
            };
            reader.onerror = () => {
                this.setState({
                    loading: false,
                });
            }
            reader.readAsDataURL(file);
            // reader.readAsBinaryString(file);
        });
    }

    /**
     * @description Select texture
     * @param {ITexture} texture
     */
    private handleSelectTexture = (texture: ITexture) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(texture);
        }
    }

    /**
     * @description Search texture
     * @param {string} searchTexture
     */
    private handleSearchTexture = (searchTexture: string) => {
        this.setState({
            searchTexture,
        });
    }

    /**
     * @description Select filter type
     * @param {FilterType} selectedFilterType
     */
    private handleFilterType = (selectedFilterType: FilterType) => {
        this.setState({
            selectedFilterType,
        });
    }

    /**
     * @description Render textures on card
     * @param {ITexture[]} textures
     * @param {string} searchTexture
     * @returns {React.ReactNode}
     */
    private renderCardItems = (textures: ITexture[], searchTexture: string, selectedFilterType: string) => {
        const { type } = this.props;
        const items = textures
        .filter(texture => {
            if (type) {
                if (type === 'image/video') {
                    if (selectedFilterType === 'all') {
                        const filterTypes = type.split('/');
                        return texture.type.includes(filterTypes[0]) || texture.type.includes(filterTypes[1]);
                    }
                    return texture.type.includes(selectedFilterType);
                }
                return texture.type.includes(type);
            } else {
                if (selectedFilterType === 'all') {
                    return true;
                }
                return texture.type.includes(selectedFilterType);
            }
        })
        .filter(texture => texture.name.includes(searchTexture.toLowerCase()));
        return (
            <Scrollbar>
                {
                    items.length ? (
                        <Row gutter={16} style={{ margin: 0 }}>
                            {
                                items.map(texture => {
                                    let description;
                                    let cover;
                                    if (texture.type.includes('image')) {
                                        description = (
                                            <>
                                                <div>{`${texture.width} x ${texture.height}`}</div>
                                                <div>{formatBytes(texture.size)}</div>
                                            </>
                                        );
                                        cover = <img alt="exmaple" src={texture.url} />;
                                    } else if (texture.type.includes('video')) {
                                        description = (
                                            <>
                                                <div>{formatTime(texture.duration)}</div>
                                                <div>{`${texture.width} x ${texture.height}`}</div>
                                            </>
                                        );
                                        cover = <video src={texture.url} />;
                                    } else if (texture.type.includes('audio')) {
                                        description = (
                                            <>
                                                <div>{formatTime(texture.duration)}</div>
                                                <div>{formatBytes(texture.size)}</div>
                                            </>
                                        );
                                        cover = <img src="/images/audio.png" />;
                                    } else {
                                        description = formatBytes(texture.size);
                                        cover = <img src="/images/file.png" />;
                                    }
                                    return (
                                        <Col key={texture.id} md={24} lg={12} xl={6} onClick={() => this.handleSelectTexture(texture)}>
                                            <Card
                                                hoverable={true}
                                                style={{ marginBottom: 16, height: 280 }}
                                                bodyStyle={{ height: 100 }}
                                                cover={cover}
                                            >
                                                <Card.Meta
                                                    title={texture.name}
                                                    description={description}
                                                />
                                            </Card>
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    ) : <Empty />
                }
            </Scrollbar>
        );
    }

    /**
     * @description Render search
     * @returns {React.ReactNode}
     */
    private renderSearch = () => {
        return (
            <div style={{ flex: 1, padding: '0 16px' }}>
                <Input placeholder="Search for Texture..." onChange={e => this.handleSearchTexture(e.target.value)} />
            </div>
        );
    }

    /**
     * @description Render actions
     * @returns {React.ReactNode}
     */
    private renderActions = () => {
        return (
            <Button type="primary" onClick={this.handleAddTexture}>
                <Icon name="plus" />
            </Button>
        );
    }

    /**
     * @description Render filter
     * @returns {React.ReactNode}
     */
    private renderTypeFilter = (type: FilterType) => {
        return (
            <Select
                defaultValue={this.state.selectedFilterType}
                style={{ width: 120 }}
                onChange={this.handleFilterType}
            >
                <Select.Option value="all">
                    {'All'}
                </Select.Option>
                <Select.Option value="image">
                    {'Image'}
                </Select.Option>
                <Select.Option value="video">
                    {'Video'}
                </Select.Option>
                {
                    type !== 'image/video' && (
                        <Select.Option value="audio">
                            {'Audio'}
                        </Select.Option>
                    )
                }
            </Select>
        );
    }

    render() {
        const { type } = this.props;
        const { textures, loading, searchTexture, selectedFilterType } = this.state;
        return (
            <Spin spinning={loading}>
                {
                    !textures.length ? (
                        typeof type === 'undefined' ? <AddEmpty onClick={this.handleAddTexture}>
                            <Icon name="plus" style={{ marginRight: 4 }} />
                            {'New Texture'}
                        </AddEmpty> : <Empty />
                    ) : (
                        <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', padding: '0 8px 16px 8px' }}>
                                {(typeof type === 'undefined' || type === 'image/video') && this.renderTypeFilter(type)}
                                {this.renderSearch()}
                                {typeof type === 'undefined' && this.renderActions()}
                            </div>
                            <div style={{ flex: 1}}>
                                {this.renderCardItems(textures, searchTexture, selectedFilterType)}
                            </div>
                        </div>
                    )
                }
            </Spin>
        )
    }
}

export default Textures;
