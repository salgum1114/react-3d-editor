import React, { Component } from 'react';
import Icon from 'polestar-icons';
import SplitPane from 'react-split-pane';
import store from 'store';

import { Assets } from '../components/asset';
import { Entities } from '../components/entity';
import database from '../database';

interface IItemState {
    middlePane: number | string;
}

class Item extends Component<{}, IItemState> {
    state: IItemState = {
        middlePane: store.get('middlePane') || '50%',
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

    render() {
        const {
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
                    <div className="editor-item-tools-actions">
                        <Icon className="editor-icon" name="download" />
                        <Icon className="editor-icon" name="upload" />
                        <Icon className="editor-icon" name="times" onClick={() => {database.clear();}} />
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
                        <Entities />
                        <Assets />
                    </SplitPane>
                </div>
            </div>
        );
    }
}

export default Item;
