import React, { Component } from 'react';
import Icon from 'polestar-icons';
import SplitPane from 'react-split-pane';
import store from 'store';

import { Assets } from '../components/asset';
import { Entities } from '../components/entity';
import { Modal } from 'antd';
import { ShortcutHelp } from '../components/common';
import { EventTools, EntityTools } from '../tools';
import { ViewerDialog } from '../components/viewer';

interface IItemState {
    middlePane: number | string;
    helpModalVisible: boolean;
    arDialogVisible: boolean;
    defaultDialogVisible: boolean;
}

class Item extends Component<{}, IItemState> {
    state: IItemState = {
        middlePane: store.get('middlePane') || '50%',
        helpModalVisible: false,
        arDialogVisible: false,
        defaultDialogVisible: false,
    }

    componentDidMount() {
        EventTools.on('openhelpmodal', () => {
            this.handleHelpModalVisible();
        });
    }

    /**
     * @description Set the new size in middle pane
     * @param {number} newSize
     */
    private handleMiddlePane = (newSize: number) => {
        store.set('middlePane', newSize);
        this.setState({
            middlePane: newSize,
        });
    }

    /**
     * @description Change to help modal visible
     */
    private handleHelpModalVisible = () => {
        this.setState(prevState => {
            return {
                helpModalVisible: !prevState.helpModalVisible,
            }
        });
    }

    /**
     * @description Change to ar dialog visible
     */
    private handleARDialogVisible = () => {
        this.setState(prevState => {
            return {
                arDialogVisible: !prevState.arDialogVisible,
            }
        });
    }

    /**
     * @description Change to default dialog visible
     */
    private handleDefaultDialogVisible = () => {
        this.setState(prevState => {
            return {
                defaultDialogVisible: !prevState.defaultDialogVisible,
            }
        });
    }

    /**
     * @description Export entity to GLTF
     */
    private handleExportToGLTF = () => {
        EntityTools.exportToGLTF(AFRAME.INSPECTOR.sceneEl);
    }

    render() {
        const {
            middlePane,
            helpModalVisible,
            arDialogVisible,
            defaultDialogVisible,
        } = this.state;
        return (
            <div className="editor-item-container">
                <div className="editor-item-tools">
                    <div style={{ flex: 1 }}>
                        <a target="_blank" href="https://github.com/salgum1114/react-3d-editor">
                            <Icon name="github" style={{ fontSize: '1.25rem' }} />
                        </a>
                    </div>
                    <div className="editor-item-tools-actions">
                        <Icon className="editor-icon" name="bullseye" onClick={this.handleARDialogVisible} />
                        <Icon className="editor-icon" name="eye"  onClick={this.handleDefaultDialogVisible} />
                        <Icon className="editor-icon" name="download" />
                        <Icon className="editor-icon" name="upload" />
                        <Icon className="editor-icon" name="save" onClick={this.handleExportToGLTF} />
                        <Icon className="editor-icon" name="question-circle-o" onClick={this.handleHelpModalVisible} />
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
                        primary="second"
                    >
                        <Entities />
                        <Assets />
                    </SplitPane>
                </div>
                <Modal
                    title={'Shortcuts'}
                    closable={true}
                    footer={null}
                    visible={helpModalVisible}
                    onCancel={this.handleHelpModalVisible}
                    width="50%"
                >
                    <ShortcutHelp />
                </Modal>
                <ViewerDialog type="ar" visible={arDialogVisible} onClose={this.handleARDialogVisible} />
                <ViewerDialog type="default" visible={defaultDialogVisible} onClose={this.handleDefaultDialogVisible} />
            </div>
        );
    }
}

export default Item;
