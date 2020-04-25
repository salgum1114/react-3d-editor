import React, { Component } from 'react';
import { Spin, Input, Button, Row, Col, Card } from 'antd';
import Icon from 'polestar-icons';
import warning from 'warning';

import Scrollbar from './Scrollbar';
import AddEmpty from './AddEmpty';
import CreateMarker from './CreateMarker';
import { MarkerDatabase } from '../../database';
import { UtilTools } from '../../tools';

export interface IMarker {
    id?: string;
    name?: string;
    title?: string;
    thumbnail: string;
    pattern: Blob;
    patternRatio: number;
    imageSize: number;
    borderColor: string;
}

export interface MarkersProps {
    onClick?: (value?: IMarker) => void;
}

interface IState {
    markers: IMarker[];
    searchMarker: string;
    loading: boolean;
    adding: boolean;
}

class Markers extends Component<MarkersProps, IState> {
    state: IState = {
        markers: [],
        searchMarker: '',
        loading: false,
        adding: false,
    }

    componentDidMount() {
        this.getMarkers();
    }

    /**
     * @description Get markers
     */
    private getMarkers = () => {
        this.setState({
            loading: true,
        });
        MarkerDatabase.allDocs().then(response => {
            const markers = response.rows.map(row => {
                const { doc } = row;
                return {
                    id: doc._id,
                    name: doc.name,
                    title: doc.title,
                    thumbnail: doc.thumbnail,
                    pattern: doc._attachments.pattern.data,
                    patternRatio: doc.patternRatio,
                    imageSize: doc.imageSize,
                    borderColor: doc.borderColor,
                } as IMarker;
            });
            this.setState({
                markers,
                loading: false,
            });
        }).catch(error => {
            warning(true, error);
            this.setState({
                loading: false,
            });
        });
    }

    /**
     * @description Adding marker
     */
    private handleAddMarkerVisible = () => {
        this.setState(prevState => {
            return {
                adding: !prevState.adding,
            };
        });
    }

    /**
     * @description Search marker
     * @param {string} searchMarker
     */
    private handleSearchMarker = (searchMarker: string) => {
        this.setState({
            searchMarker,
        });
    }

    /**
     * @description Select marker
     * @param {IMarker} marker
     */
    private handleSelectMarker = (marker: IMarker) => {
        const { onClick } = this.props;
        if (onClick) {
            onClick(marker);
        }
    }

    /**
     * @description Save marker
     * @param {IMarker} marker
     */
    private handleAppendMarker = (marker: IMarker) => {
        this.setState({
            loading: true,
        });
        MarkerDatabase.save({
            _id: marker.id,
            name: marker.name,
            title: marker.title,
            _attachments: {
                pattern: {
                    content_type: marker.pattern.type,
                    data: marker.pattern,
                },
            },
            patternRatio: marker.patternRatio,
            imageSize: marker.imageSize,
            thumbnail: marker.thumbnail,
            borderColor: marker.borderColor,
        }).then(() => {
            this.getMarkers();
        }).catch(error => {
            warning(true, error);
            this.setState({
                loading: false,
            });
        });
    }

    /**
     * @description Render card actions
     * @param {IMarker} marker
     * @returns
     */
    private renderCardActions = (marker: IMarker) => {
        return [
            <Icon
                key="download"
                name="download"
                onClick={e => {
                    e.stopPropagation();
                    UtilTools.saveBlob(marker.pattern, marker.name);
                }}
            />,
            <Icon
                key="image"
                name="image"
                onClick={e => {
                    e.stopPropagation();
                    UtilTools.saveBlob(UtilTools.dataURLToBlob(marker.thumbnail), `${marker.title}.png`);
                }}
            />,
            <Icon
                key="delete"
                name="trash"
                onClick={e => {
                    e.stopPropagation();
                    MarkerDatabase.delete(marker.id)
                    .then(() => {
                        this.getMarkers();
                    });
                }}
            />
        ];
    }

    /**
     * @description Render markers
     * @param {IMarker[]} markers
     * @param {string} searchMarker
     * @returns
     */
    private renderCardItems = (markers: IMarker[], searchMarker: string) => {
        return (
            <Scrollbar>
                <Row gutter={16} style={{ margin: 0 }}>
                    {
                        markers
                        .filter(marker => marker.name.includes(searchMarker.toLowerCase()))
                        .map(marker => {
                            return (
                                <Col key={marker.id} md={24} lg={12} xl={6} onClick={() => this.handleSelectMarker(marker)}>
                                    <Card
                                        hoverable={true}
                                        // style={{ marginBottom: 16, height: 280 }}
                                        // bodyStyle={{ height: 100 }}
                                        cover={<img src={marker.thumbnail} />}
                                        actions={this.renderCardActions(marker)}
                                    >
                                        <Card.Meta
                                            title={marker.name}
                                        />
                                    </Card>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Scrollbar>
        );
    }

    /**
     * @description Render search
     * @returns {React.ReactNode}
     */
    private renderSearch = () => {
        return (
            <div style={{ flex: 1, padding: '0 16px 0 0' }}>
                <Input allowClear={true} placeholder="Search for Marker..." onChange={e => this.handleSearchMarker(e.target.value)} />
            </div>
        );
    }

    /**
     * @description Render actions
     * @returns {React.ReactNode}
     */
    private renderActions = () => {
        return (
            <Button type="primary" onClick={this.handleAddMarkerVisible}>
                <Icon name="plus" />
            </Button>
        );
    }

    render() {
        const { loading, markers, searchMarker, adding } = this.state;
        return (
            <Spin spinning={loading}>
                <div style={{ display: 'flex', height: '100%' }}>
                    {
                        markers.length ? (
                            <div style={{ display: 'flex', height: '100%', flexDirection: 'column', flex: 1 }}>
                                <div style={{ display: 'flex', padding: '0 8px 16px 8px' }}>
                                    {this.renderSearch()}
                                    {this.renderActions()}
                                </div>
                                <div style={{ flex: 1 }}>
                                    {this.renderCardItems(markers, searchMarker)}
                                </div>
                            </div>
                        ) : (
                            <AddEmpty onClick={this.handleAddMarkerVisible}>
                                <Icon name="plus" style={{ marginRight: 4 }} />
                                {'New Marker'}
                            </AddEmpty>
                        )
                    }
                    <CreateMarker visible={adding} onSave={this.handleAppendMarker} onCancel={this.handleAddMarkerVisible} />
                </div>
            </Spin>
        );
    }
}

export default Markers;
