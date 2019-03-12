import React, { Component } from 'react';
import { Tree, Icon, Input, Modal, List, Avatar, message } from 'antd';
import { IPrimitive, primitives, IEntity } from '../constants';
import { Entity } from 'aframe';
import { EntityTools, EventTools } from '../tools';

interface IItemProps {

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
            if (this.state.selectedKeys.length === 0 || this.state.treeNodes.length === 0 || this.state.selectedKeys[0] === 'scene') {
                if (!this.state.expandedKeys.some(key => key === 'scene')) {
                    this.state.expandedKeys.push('scene');
                }
                this.state.treeNodes.push({
                    key: entity.id,
                    id: entity.object3D.id,
                    type: entity.tagName.toLowerCase(),
                    title: entity.title,
                    icon: 'eye',
                    children: [],
                    parentKey: 'scene',
                });
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
                        icon: 'eye',
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
        console.log(selectedKeys);
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

    renderListItem = (item: IPrimitive) => {
        return (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar><Icon type={item.icon} /></Avatar>}
                    title={
                        <div style={{ display: 'flex' }}>
                            <a style={{ flex: 1 }} onClick={() => { this.handleAddEntity(item); }}>{item.title}</a>
                            <div style={{ alignSelf: 'flex-end' }}>
                                <a target="_blank" href={item.url}><Icon type="question-circle" /></a>
                            </div>
                        </div>
                    }
                    description={item.description}
                />
            </List.Item>
        );
    }

    renderTreeNodes = (treeNodes: IEntity[]) => treeNodes.map(item => {
        if (item.children) {
            return (
                <Tree.TreeNode key={item.key} title={item.title} icon={<Icon type={item.icon} />} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </Tree.TreeNode>
            );
        }
        return <Tree.TreeNode key={item.key} title={item.title} icon={<Icon type={item.icon} />} dataRef={item} />;
    })

    render() {
        const { visible, treeNodes, selectedKeys, expandedKeys } = this.state;
        return (
            <div className="editor-item-container">
                <div className="editor-item-tools">
                    <div style={{ flex: 1 }}>
                        <a target="_blank" href="https://github.com/salgum1114/react-3d-editor">
                            <Icon type="github" style={{ fontSize: '1.2rem' }} />
                        </a>
                    </div>
                    <div>
                        <Icon className="editor-icon" style={{ fontSize: '1.2rem', marginRight: 8 }} type="plus" onClick={this.handleModalVisible} />
                        <Icon className="editor-icon" style={{ fontSize: '1.2rem' }} type="delete" onClick={this.handleDeleteEntity} />
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
                    <Tree.TreeNode
                        key="scene"
                        icon={<Icon type="eye" />}
                        title="<a-scene>"
                    >
                        {this.renderTreeNodes(treeNodes)}
                    </Tree.TreeNode>
                </Tree>
                <Modal
                    title="Add entity"
                    visible={visible}
                    onCancel={this.handleModalVisible}
                    footer={[]}
                >
                    <List
                        dataSource={primitives}
                        renderItem={this.renderListItem}
                    />
                </Modal>
            </div>
        );
    }
}

export default Item;
