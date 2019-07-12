import React, { Component } from 'react';
import { Tree, Input, Modal, message, Tabs, Row, Col, Card, Radio, List, Avatar } from 'antd';
import { Entity } from 'aframe';
import Icon from 'polestar-icons';
import debounce from 'lodash/debounce';
import SplitPane from 'react-split-pane';
import store from 'store';

import { IPrimitive, primitives, catalogs, IEntity } from '../constants';
import { EntityTools, EventTools } from '../tools';
import { Scrollbar, SidebarContainer } from '../components/common';
import { Assets } from '../components/asset';

type ViewTypes = 'card' | 'list';

interface IItemProps {
    isScene?: boolean;
}

interface IItemState {
    visible: boolean;
    treeNodes: IEntity[];
    selectedKeys: string[];
    expandedKeys: string[];
    searchPrimitives?: string;
    searchCatalogs?: string;
    viewPrimitives?: ViewTypes;
    viewCatalogs?: ViewTypes;
    middlePane: number | string;
}

class Item extends Component<IItemProps, IItemState> {
    state: IItemState = {
        visible: false,
        treeNodes: [],
        selectedKeys: [],
        expandedKeys: [],
        searchPrimitives: '',
        searchCatalogs: '',
        viewPrimitives: 'card',
        viewCatalogs: 'card',
        middlePane: store.get('middlePane') || '50%',
    }

    componentDidMount() {
        EventTools.on('sceneloaded', (scene) => {
            console.log(scene);
            this.buildTreeNode(scene);
        });
        EventTools.on('entitycreate', (entity: Entity) => {
            if (this.state.selectedKeys.length === 0 || this.state.treeNodes.length === 0) {
                if (this.props.isScene && this.state.selectedKeys[0] === 'scene') {
                    if (!this.state.expandedKeys.some(key => key === 'scene')) {
                        this.state.expandedKeys.push('scene');
                    }
                    this.state.treeNodes.push({
                        key: entity.id,
                        id: entity.object3D.id,
                        type: entity.tagName.toLowerCase(),
                        title: entity.title,
                        icon: entity.dataset.icon,
                        children: [],
                        parentKey: 'scene',
                    });
                } else {
                    this.state.treeNodes.push({
                        key: entity.id,
                        id: entity.object3D.id,
                        type: entity.tagName.toLowerCase(),
                        title: entity.title,
                        icon: entity.dataset.icon,
                        children: [],
                        parentKey: 'scene',
                    });
                }
            } else {
                if (this.state.selectedKeys.length) {
                    const selectedKey = this.state.selectedKeys[0];
                    const parentNode = this.findTreeNode(selectedKey, this.state.treeNodes);
                    if (!this.state.expandedKeys.some(key => key === parentNode.key)) {
                        this.state.expandedKeys.push(parentNode.key)
                    }
                    parentNode.children.push({
                        key: entity.id,
                        id: entity.object3D.id,
                        type: entity.tagName.toLowerCase(),
                        title: entity.title,
                        icon: entity.dataset.icon,
                        children: [],
                        parentKey: selectedKey,
                    });
                }
            }
            this.setState({
                treeNodes: this.state.treeNodes,
                expandedKeys: Array.from(this.state.expandedKeys),
            });
        });

        EventTools.on('entityselect', (entity: Entity) => {
            if (entity) {
                this.setState({
                    selectedKeys: [entity.id],
                });
            } else {
                this.setState({
                    selectedKeys: [],
                });
            }
        });

        EventTools.on('objectselect', (object3D: THREE.Object3D) => {
            if (!object3D) {
                this.setState({
                    selectedKeys: [],
                });
            }
        });

        EventTools.on('objectremove', (object3D: THREE.Object3D) => {
            const findNode = this.findTreeNode(AFRAME.INSPECTOR.selectedEntity.id, this.state.treeNodes);
            if (findNode) {
                const parentNode = this.findTreeNode(findNode.parentKey, this.state.treeNodes);
                let treeNodes = [] as IEntity[];
                if (!parentNode) {
                    treeNodes = this.state.treeNodes.filter((child: IEntity) => child.key !== findNode.key);
                } else {
                    const findIndex = parentNode.children.findIndex((child: IEntity) => child.key === findNode.key);
                    if (findIndex > -1) {
                        parentNode.children.splice(findIndex, 1);
                        treeNodes = this.state.treeNodes;
                    }
                }
                this.setState({
                    treeNodes,
                });
            }
        });
    }

    buildTreeNode = (scene) => {
        this.state.treeNodes = [{
            key: scene.el.id,
            id: scene.id,
            type: scene.el.tagName.toLowerCase(),
            title: 'Scene',
            icon: 'eye',
            entity: scene.el as Entity,
            children: [],
        }];
        const traverseBuildTreeNode = (treeNode: IEntity) => {
            for (let i = 0; i < treeNode.entity.children.length; i++) {
                const en = treeNode.entity.children[i] as Entity;
                if (en.dataset.isInspector || !en.isEntity
                || en.isInspector || 'aframeInspector' in en.dataset
                || !en.id || en.id === 'cameraWrapper') {
                    continue;
                }
                const childTreeNode: IEntity = {
                    key: en.id,
                    id: en.object3D.id,
                    type: en.tagName.toLowerCase(),
                    title: en.title,
                    icon: en.dataset.icon,
                    entity: en,
                    children: [],
                    parentKey: treeNode.key,
                };
                treeNode.children.push(childTreeNode);
                if (en.children && en.children.length) {
                    traverseBuildTreeNode(childTreeNode);
                }
            }
        }
        traverseBuildTreeNode(this.state.treeNodes[0]);
        console.log(this.state.treeNodes);
    }

    /**
     * Traverse to find the node
     *
     * @param {string} key
     * @param {IEntity[]} [treeNodes]
     * @returns {IEntity}
     */
    findTreeNode = (key: string, treeNodes?: IEntity[]): IEntity => {
        let findNode;
        for (let i = 0; i < treeNodes.length; i++) {
            const node = treeNodes[i];
            if (node.key === key) {
                findNode = node;
                return findNode;
            }
            if (node.children.length) {
                findNode = this.findTreeNode(key, node.children);
                if (findNode) {
                    return findNode;
                }
            }
        }
        return findNode;
    }

    /**
     * Delete the entity
     *
     */
    handleDeleteEntity = () => {
        if (AFRAME.INSPECTOR.selectedEntity) {
            Modal.confirm({
                title: 'Delete entity',
                content: 'Are you sure want to delete this entity?',
                onOk: () => {
                    const findNode = this.findTreeNode(AFRAME.INSPECTOR.selectedEntity.id, this.state.treeNodes);
                    if (findNode.children.length) {
                        message.warn('There are child entities.');
                        return;
                    }
                    EntityTools.removeSelectedEntity();
                },
            });
        }
    }

    /**
     * Add the Entity
     *
     * @param {IPrimitive} item
     */
    handleAddEntity = (item: IPrimitive) => {
        this.handleModalVisible();
        EntityTools.createEntity(item);
    }

    /**
     * Change to visible in Modal
     *
     */
    handleModalVisible = () => {
        this.setState((prevState: IItemState) => {
            return {
                visible: !prevState.visible,
            };
        });
    }

    /**
     * Select the entity
     *
     * @param {string[]} selectedKeys
     */
    handleSelectEntity = (selectedKeys: string[]) => {
        this.setState({
            selectedKeys,
        }, () => {
            if (selectedKeys.length) {
                EntityTools.selectEntity(selectedKeys[0]);
            }
        });
    }

    /**
     * Expand tree node for the entity
     *
     * @param {string[]} expandedKeys
     */
    handleExpandEntity = (expandedKeys: string[]) => {
        this.setState({
            expandedKeys,
        });
    }

    /**
     * Search in Primitives
     *
     * @param {string} searchPrimitives
     */
    handleSearchPrimitives = (searchPrimitives: string) => {
        this.setState({
            searchPrimitives,
        });
    }

    /**
     * Search in Catalogs
     *
     * @param {string} searchCatalogs
     */
    handleSearchCatalogs = (searchCatalogs: string) => {
        this.setState({
            searchCatalogs,
        });
    }

    /**
     * Change to view type in Primitives
     *
     * @param {ViewTypes} viewPrimitives
     */
    handleViewPrimitives = (viewPrimitives: ViewTypes) => {
        this.setState({
            viewPrimitives,
        });
    }

    /**
     * Change to view type in Catalogs
     *
     * @param {ViewTypes} viewCatalogs
     */
    handleViewCatalogs = (viewCatalogs: ViewTypes) => {
        this.setState({
            viewCatalogs,
        });
    }

    /**
     * Set the new size in middle pane
     *
     * @param {number} newSize
     */
    handleMiddlePane = (newSize: number) => {
        store.set('middlePane', newSize);
        this.setState({
            middlePane: newSize,
        });
    }

    /**
     * Render the tree node
     *
     * @param {IEntity[]} treeNodes
     */
    renderTreeNodes = (treeNodes: IEntity[]) => treeNodes.map(item => {
        if (item.children && item.children.length) {
            return (
                <Tree.TreeNode
                    key={item.key}
                    title={item.title}
                    icon={<Icon name={item.icon} />}
                    dataRef={item}
                >
                    {this.renderTreeNodes(item.children)}
                </Tree.TreeNode>
            );
        }
        return (
            <Tree.TreeNode
                key={item.key}
                title={item.title}
                icon={<Icon name={item.icon} />}
                dataRef={item}
            />
        );
    })

    /**
     * Render the items with Card
     *
     * @param {IPrimitive[]} items
     * @returns
     */
    renderCardItems = (items: IPrimitive[], searchText: string) => {
        return (
            <Scrollbar>
                <Row gutter={16} style={{ margin: 0 }}>
                    {
                        items
                        .filter(item => item.title.includes(searchText.toLowerCase()) || item.description.includes(searchText.toLowerCase()))
                        .map(item => {
                            return (
                                <Col key={item.key} md={24} lg={12} xl={6} onClick={() => this.handleAddEntity(item)}>
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
            </Scrollbar>
        )
    }

    /**
     * Render the items with List
     *
     * @param {IPrimitive[]} items
     * @param {string} searchText
     * @returns
     */
    renderListItems = (items: IPrimitive[], searchText: string) => {
        return (
            <Scrollbar>
                <List
                    style={{ padding: '0 8px' }}
                    dataSource={items.filter(item => item.title.includes(searchText.toLowerCase()) || item.description.includes(searchText.toLowerCase()))}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar><Icon name={item.icon} /></Avatar>}
                                title={
                                    <div style={{ display: 'flex' }}>
                                        <a style={{ flex: 1 }} onClick={() => { this.handleAddEntity(item); }}>{item.title}</a>
                                        <div style={{ alignSelf: 'flex-end' }}>
                                            <a className="editor-item-help-icon" target="_blank" href={item.url}><Icon name="question-circle-o" /></a>
                                        </div>
                                    </div>
                                }
                                description={item.description}
                            />
                        </List.Item>
                    )}
                />
            </Scrollbar>
        );
    }

    /**
     * Render the search form
     *
     * @param {(value: string) => void} callback
     * @returns
     */
    renderSearch = debounce((callback: (value: string) => void) => {
        return (
            <div style={{ flex: 1, paddingRight: 16 }}>
                <Input placeholder="Search for Entity..." onChange={e => callback(e.target.value)} />
            </div>
        )
    }, 200)

    /**
     * Render the view type form
     *
     * @param {ViewTypes} viewType
     * @param {(value: ViewTypes) => void} callback
     * @returns
     */
    renderViewType = (viewType: ViewTypes, callback: (value: ViewTypes) => void) => {
        return (
            <Radio.Group buttonStyle="solid" value={viewType} defaultValue={viewType} onChange={e => callback(e.target.value)}>
                <Radio.Button value="card"><Icon name="table" /></Radio.Button>
                <Radio.Button value="list"><Icon name="list" /></Radio.Button>
            </Radio.Group>
        )
    }

    render() {
        const { isScene } = this.props;
        const {
            visible, treeNodes,
            selectedKeys, expandedKeys,
            viewPrimitives, viewCatalogs,
            searchPrimitives, searchCatalogs,
            middlePane,
        } = this.state;
        return (
            <div className="editor-item-container">
                <div className="editor-item-tools">
                    <div style={{ flex: 1 }}>
                        <a target="_blank" href="https://github.com/salgum1114/react-3d-editor">
                            <Icon name="github" style={{ fontSize: '1.25rem' }} />
                        </a>
                    </div>
                    <div>
                        <Icon className="editor-icon" style={{ fontSize: '1.25rem', marginRight: 8 }} name="plus" onClick={this.handleModalVisible} />
                        <Icon className="editor-icon" style={{ fontSize: '1.25rem' }} name="trash" onClick={this.handleDeleteEntity} />
                    </div>
                </div>
                <div className="editor-item-tree">
                    <SplitPane
                        style={{ position: 'relative' }}
                        split="horizontal"
                        size={middlePane}
                        minSize={200}
                        maxSize={700}
                        onDragFinished={this.handleMiddlePane}
                    >
                        <SidebarContainer
                            titleStyle={{ border: 0 }}
                            title={'Entity'}
                        >
                            <Scrollbar>
                                {
                                    treeNodes.length ? (
                                        <Tree
                                            showIcon={true}
                                            defaultExpandParent={true}
                                            selectedKeys={selectedKeys}
                                            expandedKeys={expandedKeys}
                                            onExpand={this.handleExpandEntity}
                                            onSelect={this.handleSelectEntity}
                                        >
                                            {
                                                isScene ? (
                                                    <Tree.TreeNode
                                                        key="scene"
                                                        icon={<Icon name="eye" />}
                                                        title="Scene"
                                                    >
                                                        {this.renderTreeNodes(treeNodes)}
                                                    </Tree.TreeNode>
                                                ) : this.renderTreeNodes(treeNodes)
                                            }
                                        </Tree>
                                    ) : (
                                        <div className="editor-empty">
                                            <List />
                                        </div>
                                    )
                                }
                            </Scrollbar>
                        </SidebarContainer>
                        <SidebarContainer
                            titleStyle={{ border: 0 }}
                            title={'Assets'}
                        >
                            <Scrollbar>
                                <Assets />
                            </Scrollbar>
                        </SidebarContainer>
                    </SplitPane>
                </div>
                <Modal
                    className="editor-item-modal"
                    title={'Add Entity'}
                    visible={visible}
                    onCancel={this.handleModalVisible}
                    closable={true}
                    footer={null}
                    width="75%"
                    style={{ height: '75%' }}
                >
                    <Tabs tabPosition="left">
                        <Tabs.TabPane key="primitives" tab="Primitives">
                            <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', padding: '0 8px 16px 8px' }}>
                                    {this.renderSearch(this.handleSearchPrimitives)}
                                    {this.renderViewType(viewPrimitives, this.handleViewPrimitives)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    {viewPrimitives === 'card' ? this.renderCardItems(primitives, searchPrimitives) : this.renderListItems(primitives, searchPrimitives)}
                                </div>
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="catalogs" tab="Catalogs">
                            <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', padding: '0 8px 16px 8px' }}>
                                    {this.renderSearch(this.handleSearchCatalogs)}
                                    {this.renderViewType(viewCatalogs, this.handleViewCatalogs)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    {viewCatalogs === 'card' ? this.renderCardItems(catalogs, searchCatalogs) : this.renderListItems(catalogs, searchCatalogs)}
                                </div>
                            </div>
                        </Tabs.TabPane>
                    </Tabs>
                </Modal>
            </div>
        );
    }
}

export default Item;
