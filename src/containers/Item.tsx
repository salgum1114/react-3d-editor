import React, { Component } from 'react';
import { Tree, Icon, Input, Modal, List, Avatar } from 'antd';
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
                        type: entity.tagName.toLowerCase(),
                        title: entity.title,
                        icon: 'eye',
                        children: [],
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
        })
    }

    findTreeNode = (id: string, treeNodes?: IEntity[]): any => {
        let parentNode;
        for (let i = 0; i < treeNodes.length; i++) {
            const node = treeNodes[i];
            if (node.key === id) {
                parentNode = node;
                return parentNode;
            }
            if (node.children.length) {
                parentNode = this.findTreeNode(id, node.children);
                if (parentNode) {
                    return parentNode;
                }
            }
        }
        return parentNode;
    }

    handleDeleteEntity = () => {
        Modal.confirm({
            title: 'Delete confirm',
            content: 'Are you sure want to delete this entity?',
            onOk: () => {

            },
        });
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
