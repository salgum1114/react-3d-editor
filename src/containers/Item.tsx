import React, { Component } from 'react';
import { Tree, Input, Modal, message, Tabs, Row, Col, Card } from 'antd';
import { Entity } from 'aframe';
import Icon from 'polestar-icons';

import { IPrimitive, primitives, catalogs, IEntity } from '../constants';
import { EntityTools, EventTools } from '../tools';
import { Scrollbar } from '../components/common';

interface IItemProps {
    isScene?: boolean;
}

interface IItemState {
    visible: boolean;
    treeNodes: IEntity[];
    selectedKeys: string[];
    expandedKeys: string[];
}

class Item extends Component<IItemProps, IItemState> {
    state: IItemState = {
        visible: false,
        treeNodes: [],
        selectedKeys: [],
        expandedKeys: [],
    }

    componentDidMount() {
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

    handleAddEntity = (item: IPrimitive) => {
        this.handleModalVisible();
        EntityTools.createEntity(item);
    }

    handleModalVisible = () => {
        this.setState((prevState: IItemState) => {
            return {
                visible: !prevState.visible,
            };
        });
    }

    handleSearchEntity = () => {

    }

    handleSelectEntity = (selectedKeys: string[]) => {
        this.setState({
            selectedKeys,
        }, () => {
            if (selectedKeys.length) {
                EntityTools.selectEntity(selectedKeys[0]);
            }
        });
    }

    handleExpandEntity = (expandedKeys: string[]) => {
        this.setState({
            expandedKeys,
        });
    }

    /**
     * Render the tree node
     *
     * @param {IEntity[]} treeNodes
     */
    renderTreeNodes = (treeNodes: IEntity[]) => treeNodes.map(item => {
        console.log(item)
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
    renderCardItems = (items: IPrimitive[]) => {
        return (
            <Row gutter={16} style={{ margin: 0 }}>
                {
                    items.map(item => {
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
        )
    }

    render() {
        const { isScene } = this.props;
        const { visible, treeNodes, selectedKeys, expandedKeys } = this.state;
        return (
            <div className="editor-item-container">
                <div className="editor-item-tools">
                    <div style={{ flex: 1 }}>
                        <a target="_blank" href="https://github.com/salgum1114/react-3d-editor">
                            <Icon name="github" style={{ fontSize: '1.2rem' }} />
                        </a>
                    </div>
                    <div>
                        <Icon className="editor-icon" style={{ fontSize: '1.2rem', marginRight: 8, cursor: 'pointer' }} name="plus" onClick={this.handleModalVisible} />
                        <Icon className="editor-icon" style={{ fontSize: '1.2rem', cursor: 'pointer' }} name="trash" onClick={this.handleDeleteEntity} />
                    </div>
                </div>
                <div className="editor-item-search">
                    <Input.Search placeholder="Search entity..." onSearch={this.handleSearchEntity} />
                </div>
                <Tree
                    className="editor-item-tree"
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
                <Modal
                    className="editor-item-modal"
                    title="Add Entity"
                    visible={visible}
                    onCancel={this.handleModalVisible}
                    closable={true}
                    footer={null}
                    width="75%"
                    style={{ height: '75%' }}
                >
                    <Tabs tabPosition="left">
                        <Tabs.TabPane key="primitives" tab="Primitives">
                            <Scrollbar>
                                {this.renderCardItems(primitives)}
                            </Scrollbar>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="catalogs" tab="Catalogs">
                            {this.renderCardItems(catalogs)}
                        </Tabs.TabPane>
                    </Tabs>
                </Modal>
            </div>
        );
    }
}

export default Item;
