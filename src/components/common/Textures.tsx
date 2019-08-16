import Icon from 'polestar-icons';
import React, { Component } from 'react';
import { Spin, Row, Col, Card, Button, Input, Select } from 'antd';
import { Entity } from 'aframe';
import uuid from 'uuid/v4';
import warning from 'warning';

import AddEmpty from './AddEmpty';
import Scrollbar from './Scrollbar';
import Empty from './Empty';
import { formatTime, formatBytes } from '../../tools/UtilTools';
import { ImageDatabase } from '../../database';
import { UtilTools } from '../../tools';

export interface ITexture {
    id: string;
    url: string;
    name: string;
    type: string;
    size: number;
    width?: number;
    height?: number;
    duration?: number;
    file?: Blob;
    thumbnail?: Blob | string;
}

type FilterType = 'all' | 'image' | 'video' | 'audio' | 'image/video' | 'etc' | string;

interface IProps {
    onClick?: (value?: any) => void;
    type?: FilterType;
}

interface IState {
    textures: ITexture[];
    loading: boolean;
    searchTexture: string;
    selectedFilterType: FilterType;
}

const selectFilterTypes = [
    { value: 'all', text: 'All' },
    { value: 'image', text: 'Image' },
    { value: 'video', text: 'Video' },
    { value: 'audio', text: 'Audio' },
    { value: 'etc', text: 'Etc.' },
];

class Textures extends Component<IProps, IState> {
    state: IState = {
        textures: [],
        loading: false,
        searchTexture: '',
        selectedFilterType: 'all',
    }

    componentDidMount() {
        this.getTextures();
    }

    /**
     * @description Get textures
     */
    private getTextures = () => {
        this.setState({
            loading: true,
        });
        ImageDatabase.allDocs().then(response => {
            const { total_rows, rows } = response;
            if (total_rows) {
                const fileList = rows.reduce((prev, row, index) => {
                    const { doc } = row;
                    const { _attachments, title } = doc;
                    const attachment = _attachments[title];
                    const { data, content_type } = attachment;
                    const file = new File([data], title, { type: content_type });
                    return Object.assign(prev, {
                        [index]: file,
                    });
                }, {}) as FileList;
                this.handleAppendTexture(fileList, false);
            } else {
                this.setState({
                    loading: false,
                });
            }
        }).catch(error => {
            warning(true, error);
            this.setState({
                loading: false,
            });
        });
    }

    /**
     * @description Handle file chooser in input element
     */
    private handleAddTexture = () => {
        const { type } = this.props;
        const { selectedFilterType } = this.state;
        const allTypes = ['image/*', 'video/*', 'audio/*', '.obj', '.mtl', '.gltf', '.glb', '.patt'];
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        const setAcceptType = (type: string, input: Entity) => {
            if (type === 'image') {
                input.setAttribute('accept', allTypes[0]);
            } else if (type === 'video') {
                input.setAttribute('accept', allTypes[1]);
            } else if (type === 'audio') {
                input.setAttribute('accept', allTypes[2]);
            } else if (type === 'image/video') {
                input.setAttribute('accept', `${allTypes[0]}, ${allTypes[1]}`);
            } else if (type === 'etc') {
                allTypes.splice(0, 3);
                input.setAttribute('accept', allTypes.join(','));
            }
        }
        if (typeof type === 'undefined') {
            if (selectedFilterType === 'all') {
                input.setAttribute('accept', allTypes);
            } else {
                setAcceptType(selectedFilterType, input);
            }
        } else {
            setAcceptType(type, input);
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
            const docs = Object.keys(files).map(key => {
                const file = files[parseInt(key, 10)];
                return {
                    _id: uuid(),
                    title: file.name,
                    _attachments: {
                        [file.name]: {
                            content_type: file.type.length ? file.type : 'application/octet-stream',
                            data: file,
                        },
                    },
                };
            });
            ImageDatabase.bulkDocs(docs).catch(error => {
                this.setState({
                    loading: false,
                });
                throw new Error(error);
            });
        }
        Object.keys(files).forEach((value: string, index: number) => {
            const file = files[parseInt(value, 10)]
            const reader = new FileReader();
            const type = file.type.length ? file.type : 'application/octet-stream';
            reader.onloadend = () => {
                const url = window.URL.createObjectURL(file);
                if (file.type.includes('image')) {
                    const image = new Image();
                    image.src = url;
                    image.onload = () => {
                        const texture: ITexture = {
                            id: file.name,
                            name: file.name,
                            size: file.size,
                            type,
                            width: image.width,
                            height: image.height,
                            url,
                            file,
                        };
                        this.setState({
                            textures: this.state.textures.concat(texture),
                        });
                    }
                } else if (file.type.includes('video')) {
                    const video = document.createElement('video') as any;
                    video.src = url;
                    video.onloadedmetadata = () => {
                        const texture: ITexture = {
                            id: file.name,
                            name: file.name,
                            size: file.size,
                            type,
                            width: video.videoWidth,
                            height: video.videoHeight,
                            url,
                            file,
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
                            type,
                            url,
                            file,
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
                        type,
                        url,
                        file,
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
        const { onClick } = this.props;
        if (onClick) {
            onClick(texture);
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
     * @description Render card actions
     * @param {ITexture} texture
     * @returns
     */
    private renderCardActions = (texture: ITexture) => {
        return [
            <Icon
                key="download"
                name="download"
                onClick={e => {
                    e.stopPropagation();
                    UtilTools.saveBlob(texture.file, texture.name);
                }}
            />,
            <Icon
                key="delete"
                name="trash"
                onClick={e => {
                    e.stopPropagation();
                    ImageDatabase.delete(texture.id)
                    .then(() => {
                        this.getTextures();
                    });
                }}
            />
        ];
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
                } else if (type === 'etc') {
                    return texture.type.includes('application');
                }
                return texture.type.includes(type);
            } else {
                if (selectedFilterType === 'all') {
                    return true;
                } else if (selectedFilterType === 'etc') {
                    return texture.type.includes('application');
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
                                                style={{ marginBottom: 16 }}
                                                bodyStyle={{ height: 100 }}
                                                cover={cover}
                                                actions={this.renderCardActions(texture)}
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
                <Input allowClear={true} placeholder="Search for Texture..." onChange={e => this.handleSearchTexture(e.target.value)} />
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
        const { type } = this.props;
        return typeof type === 'undefined' ? (
            <Select
                defaultValue={this.state.selectedFilterType}
                style={{ width: 120 }}
                onChange={this.handleFilterType}
            >
                {
                    selectFilterTypes.map(filterType => {
                        return (
                            <Select.Option key={filterType.value} value={filterType.value}>
                                {filterType.text}
                            </Select.Option>
                        );
                    })
                }
            </Select>
        ) : (type === 'image/video' ? (
            <Select
                defaultValue={this.state.selectedFilterType}
                style={{ width: 120 }}
                onChange={this.handleFilterType}
            >
                {
                    selectFilterTypes
                    .filter(filterType => filterType.value === 'all' || filterType.value === 'image' || filterType.value === 'video')
                    .map(filterType => {
                        return (
                            <Select.Option key={filterType.value} value={filterType.value}>
                                {filterType.text}
                            </Select.Option>
                        );
                    })
                }
            </Select>
        ) : null)
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
                                {this.renderTypeFilter()}
                                {this.renderSearch()}
                                {this.renderActions()}
                            </div>
                            <div style={{ flex: 1 }}>
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
