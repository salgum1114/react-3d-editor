import Icon from 'polestar-icons';
import React, { Component } from 'react';
import { Spin, Row, Col, Card, Button, Input, Select } from 'antd';

import AddEmpty from './AddEmpty';
import Scrollbar from './Scrollbar';
import Empty from './Empty';
import { formatTime, formatBytes } from '../../tools/UtilTools';

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

type FilterType = 'all' | 'image' | 'video' | 'audio';

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
     */
    private handleAppendTexture = (files: FileList) => {
        const { length } = files;
        Object.keys(files).forEach((value: string, index: number) => {
            const file = files[parseInt(value, 10)]
            const reader = new FileReader();
            reader.onloadend = () => {
                if (file.type.includes('image')) {
                    const image = new Image();
                    const url = window.URL.createObjectURL(file);
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
                    const url = window.URL.createObjectURL(file);
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
                    const url = window.URL.createObjectURL(file);
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
                    const url = window.URL.createObjectURL(file);
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
            reader.readAsBinaryString(file);
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
        const items = textures
        .filter(texture => selectedFilterType === 'all' ? true : texture.type.includes(selectedFilterType))
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
    private renderTypeFilter = () => {
        return (
            <Select defaultValue={this.state.selectedFilterType} style={{ width: 120 }} onChange={this.handleFilterType}>
                <Select.Option value="all">
                    {'All'}
                </Select.Option>
                <Select.Option value="image">
                    {'Image'}
                </Select.Option>
                <Select.Option value="video">
                    {'Video'}
                </Select.Option>
                <Select.Option value="audio">
                    {'Audio'}
                </Select.Option>
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
                                {typeof type === 'undefined' && this.renderTypeFilter()}
                                {this.renderSearch()}
                                {typeof type === 'undefined' && this.renderActions()}
                            </div>
                            <div style={{ flex: 1}}>
                                {this.renderCardItems(textures, searchTexture, type || selectedFilterType)}
                            </div>
                        </div>
                    )
                }
            </Spin>
        )
    }
}

export default Textures;
