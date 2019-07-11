import React, { Component } from 'react';
import { Layout, Button } from 'antd';
import classnames from 'classnames';

import '../styles/index.less';
import Setting from './Setting';
import Item from './Item';
import { Toolbar } from '../components/toolbar';
import { Inspector } from '../components/inspector';

interface IState {
    inspectorEnabled: boolean;
}

class Editor extends Component<{}, IState> {
    state: IState = {
        inspectorEnabled: true,
    }

    handleScene = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.target.blur();
        if (!this.state.inspectorEnabled) {
            AFRAME.INSPECTOR.open();
        } else {
            AFRAME.INSPECTOR.close();
        }
        this.setState({
            inspectorEnabled: !this.state.inspectorEnabled,
        });
    }

    render() {
        const { inspectorEnabled } = this.state;
        return (
            <Layout>
                <Layout.Sider
                    style={{ zIndex: 999 }}
                    theme="light"
                    collapsedWidth={0}
                    collapsed={!inspectorEnabled}
                    width={230}
                >
                    <Item />
                </Layout.Sider>
                <Layout.Content style={{ position: 'relative' }}>
                    <div className="editor-view-container">
                        <Button className="editor-inspector-btn" block={true} onClick={this.handleScene} type="primary">
                            {!inspectorEnabled ? 'Inspect Scene' : 'Back to the Scene'}
                        </Button>
                        <div className={classnames('editor-view-header', { collapsed: !inspectorEnabled })}>
                            <Toolbar />
                        </div>
                        <div className="editor-view-content">
                            <Inspector />
                        </div>
                    </div>
                </Layout.Content>
                <Layout.Sider
                    theme="light"
                    style={{ zIndex: 999 }}
                    collapsedWidth={0}
                    collapsed={!inspectorEnabled}
                    width={360}
                >
                    <Setting />
                </Layout.Sider>
            </Layout>
        );
    }
}

export default Editor;
