import React, { Component } from 'react';
import Icon from 'polestar-icons';
import { Entity } from 'aframe';
import { Modal, Tree, Row, Col, Card, Tabs, Input } from 'antd';
import uuid from 'uuid/v4';
import { AntTreeNodeSelectedEvent } from 'antd/lib/tree';

import { SidebarContainer, Scrollbar, Empty, AddEmpty, Textures } from '../common';
import { EventTools, AssetTools } from '../../tools';
import { IScene } from '../../tools/InspectorTools';
import { IEntity, getIcon, IDetailEntity, IPrimitive, assetPrimitives, catalogs } from '../../constants';

interface IState {
    assets: IEntity[];
    visible: boolean;
    selectedKeys: string[];
    spinning: boolean;
    searchPrimitives?: string;
    searchCatalogs?: string;
}

class Assets extends Component<{}, IState> {
    state: IState = {
        assets: [],
        visible: false,
        selectedKeys: [],
        spinning: true,
        searchPrimitives: '',
        searchCatalogs: '',
    }

    componentDidMount() {
        EventTools.on('sceneloaded', (scene: IScene) => {
            const assets = this.buildAssets(scene);
            this.setState({
                assets,
                spinning: false,
            });
        });
        EventTools.on('assetcreate', () => {
            const assets = this.buildAssets(AFRAME.INSPECTOR.sceneEl);
            this.setState({
                assets,
            });
        });
        EventTools.on('assetselect', (asset: Entity) => {
            if (asset) {
                this.setState({
                    selectedKeys: [asset.id],
                });
            } else {
                this.setState({
                    selectedKeys: [],
                });
            }
        });
        EventTools.on('assetremove', () => {
            const assets = this.buildAssets(AFRAME.INSPECTOR.sceneEl);
            this.setState({
                assets,
            });
        });
        EventTools.on('entityselect', () => {
            this.setState({
                selectedKeys: [],
            });
        });
        EventTools.on('entityupdate', (detail: IDetailEntity) => {
            if (!detail.entity.object3D && detail.component === 'name') {
                detail.entity.title = detail.value;
                const assets = this.buildAssets(AFRAME.INSPECTOR.sceneEl);
                this.setState({
                    assets,
                });
            }
        });
    }

    /**
     * @description Building assets
     * @param {IScene} scene
     * @returns {IEntity[]} assets
     */
    private buildAssets = (scene: IScene) => {
        const assets: IEntity[] = [];
        if (scene.firstElementChild.id === 'assets') {
            for (let i = 0; i < scene.firstElementChild.children.length; i++) {
                const en = scene.firstElementChild.children[i] as Entity;
                if (!en.id) {
                    en.id = uuid();
                }
                let title;
                if (en.title) {
                    title = en.title;
                } else if (en.id) {
                    title = en.id;
                } else {
                    title = en.tagName.toLowerCase();
                }
                assets.push({
                    key: en.id,
                    type: en.tagName.toLowerCase(),
                    title,
                    entity: en,
                    icon: getIcon(en.tagName.toLowerCase()),
                });
            }
            return assets;
        }
        return assets;
    }

    /**
     * @description Change to visible in Modal
     */
    private handleModalVisible = () => {
        this.setState((prevState: IState) => {
            return {
                visible: !prevState.visible,
            };
        });
    }

    /**
     * @description Add the asset
     * @param {IPrimitive} item
     */
    private handleAddAsset = (item: IPrimitive) => {
        this.handleModalVisible();
        AssetTools.createAsset(item);
    }

    /**
     * @description Select the asset
     * @param {string[]} selectedKeys
     * @param {AntTreeNodeSelectedEvent} e
     */
    private handleSelectAsset = (selectedKeys: string[], e: AntTreeNodeSelectedEvent) => {
        this.setState({
            selectedKeys,
        }, () => {
            if (selectedKeys.length) {
                AssetTools.selectAsset(e.node.props.dataRef.entity);
                EventTools.emit('objectselect');
            } else {
                AssetTools.selectAsset();
            }
        });
    }

    /**
     * @description Delete the asset
     */
    private handleDeleteAsset = () => {
        if (AFRAME.INSPECTOR.selectedAsset) {
            Modal.confirm({
                title: 'Delete asset',
                content: 'Are you sure want to delete this asset?',
                onOk: () => {
                    AssetTools.removeSelectedAsset();
                },
            });
        }
    }

    /**
     * @description Search in Primitives
     * @param {string} searchPrimitives
     */
    private handleSearchPrimitives = (searchPrimitives: string) => {
        this.setState({
            searchPrimitives,
        });
    }

    /**
     * @description Search in Catalogs
     * @param {string} searchCatalogs
     */
    private handleSearchCatalogs = (searchCatalogs: string) => {
        this.setState({
            searchCatalogs,
        });
    }

    /**
     * @description Render the tree node
     * @param {IEntity} item
     * @returns
     */
    private renderTreeNode = (item: IEntity) => {
        return (
            <Tree.TreeNode
                key={item.key.toString()}
                title={item.title}
                icon={<Icon name={item.icon} />}
                dataRef={item}
            />
        );
    }

    /**
     * @description Render the items with Card
     * @param {IPrimitive[]} items
     * @param {string} searchText
     * @returns
     */
    private renderCardItems = (items: IPrimitive[], searchText: string) => {
        return (
            <Scrollbar>
                {
                    items.length ? (
                        <Row gutter={16} style={{ margin: 0 }}>
                            {
                                items
                                .filter(item => item.title.includes(searchText.toLowerCase()) || item.description.includes(searchText.toLowerCase()))
                                .map(item => {
                                    return (
                                        <Col key={item.key} md={24} lg={12} xl={6} onClick={() => this.handleAddAsset(item)}>
                                            <Card
                                                hoverable={true}
                                                title={item.title}
                                                extra={
                                                    <a className="editor-item-help-icon" onClick={e => e.stopPropagation()} target="_blank" href={item.url}>
                                                        <Icon name="question-circle-o" />
                                                    </a>
                                                }
                                                style={{ marginBottom: 16 }}
                                                bodyStyle={{ padding: 12, height: 120 }}
                                            >
                                                <div className="editor-item-card-desc">
                                                    {item.description}
                                                </div>
                                            </Card>
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    ) : <Empty />
                }
            </Scrollbar>
        )
    }

    /**
     * Render the search form
     *
     * @param {(value: string) => void} callback
     * @returns
     */
    private renderSearch = (callback: (value: string) => void) => {
        return (
            <div style={{ flex: 1, paddingRight: 16 }}>
                <Input placeholder="Search for Asset..." onChange={e => callback(e.target.value)} />
            </div>
        )
    }

    render() {
        const { assets, visible, spinning, selectedKeys, searchPrimitives, searchCatalogs } = this.state;
        return (
            <SidebarContainer
                titleStyle={{ border: 0 }}
                title={
                    <>
                        <div style={{ flex: 1 }}>{'Assets'}</div>
                        <div>
                            <Icon className="editor-icon" style={{ fontSize: '1.25rem', marginRight: 8 }} name="plus" onClick={this.handleModalVisible} />
                            <Icon className="editor-icon" style={{ fontSize: '1.25rem' }} name="trash" onClick={this.handleDeleteAsset} />
                        </div>
                    </>
                }
                spinning={spinning}
            >
                {
                    assets.length ? (
                        <Tree
                            showIcon={true}
                            onSelect={this.handleSelectAsset}
                            selectedKeys={selectedKeys}
                        >
                            {assets.map(asset => this.renderTreeNode(asset))}
                        </Tree>
                    ) : <AddEmpty onClick={this.handleModalVisible} />
                }
                <Modal
                    className="editor-item-modal"
                    title={'Add Assets'}
                    visible={visible}
                    onCancel={this.handleModalVisible}
                    footer={null}
                    width="75%"
                    style={{ height: '75%' }}
                >
                    <Tabs tabPosition="left">
                        <Tabs.TabPane key="primitives" tab="Primitives">
                            <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', padding: '0 8px 16px 8px' }}>
                                    {this.renderSearch(this.handleSearchPrimitives)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    {this.renderCardItems(assetPrimitives, searchPrimitives)}
                                </div>
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="textures" tab="Textures">
                            <Textures />
                        </Tabs.TabPane>
                    </Tabs>
                </Modal>
            </SidebarContainer>
        );
    }
}

export default Assets;
