import React, { Component } from 'react';
import { Tree, Icon, Input, Modal, List, Avatar } from 'antd';
import { IPrimitive, primitives } from '../constants';

interface IItemProps {

}

interface IItemState {
    visible: boolean;
}

class Item extends Component<IItemProps, IItemState> {
    state = {
        visible: false,
    }

    handleDeleteEntity = () => {
        Modal.confirm({
            title: 'Delete confirm',
            content: 'Are you sure want to delete this entity?',
            onOk: () => {

            },
        });
    }

    handleAddEntity = () => {
        this.handleModalVisible();
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

    renderListItem = (item: IPrimitive) => {
        return (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar><Icon type={item.icon} /></Avatar>}
                    title={
                        <div style={{ display: 'flex' }}>
                            <a style={{ flex: 1 }} onClick={this.handleAddEntity}>{item.title}</a>
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

    render() {
        const { visible } = this.state;
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
                >
                    <Tree.TreeNode
                        icon={<Icon type="eye" />}
                        title="<a-scene>"
                    >
                        <Tree.TreeNode
                            icon={<Icon type="eye" />}
                            title="<a-circle>"
                        />
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
