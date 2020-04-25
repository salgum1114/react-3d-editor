import React, { Component } from 'react';
import { Layout, Button } from 'antd';
import classnames from 'classnames';
import store from 'store';
import SplitPane from 'react-split-pane';

import '../styles/index.less';
import Setting from './Setting';
import Item from './Item';
import { Toolbar } from '../components/toolbar';
import { Inspector } from '../components/inspector';

interface IState {
    inspectorEnabled: boolean;
    itemPane: number;
    settingPane: number;
}

interface IProps {
    viewGithub?: boolean;
}

class Editor extends Component<IProps, IState> {
    static defaultProps: IProps = {
        viewGithub: true,
    }

    state: IState = {
        inspectorEnabled: true,
        itemPane: parseInt(store.get('itemPane'), 10) || 230,
        settingPane: parseInt(store.get('settingPane'), 10) || 360,
    }

    /**
     * Change to Inpsector open or close
     *
     * @param {React.MouseEvent<HTMLElement, MouseEvent>} e
     */
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

    /**
     * Set the new size in item pane
     *
     * @param {number} newSize
     */
    handleItemPane = (newSize: number) => {
        store.set('itemPane', newSize);
        this.setState({
            itemPane: newSize,
        });
    }

    /**
     * Set the new size in setting pane
     *
     * @param {number} newSize
     */
    handleSettingPane = (newSize: number) => {
        store.set('settingPane', newSize);
        this.setState({
            settingPane: newSize,
        });
    }

    render() {
        const { inspectorEnabled, itemPane, settingPane } = this.state;
        return (
            <Layout>
                <SplitPane
                    split="vertical"
                    allowResize={inspectorEnabled}
                    size={inspectorEnabled ? itemPane : 0}
                    minSize={230}
                    maxSize={400}
                    onDragFinished={this.handleItemPane}
                >
                    <Layout.Sider
                        style={{ zIndex: 999, height: '100%' }}
                        theme="light"
                        collapsedWidth={0}
                        collapsed={!inspectorEnabled}
                        width={'inherit'}
                    >
                        <Item />
                    </Layout.Sider>
                    <SplitPane
                        split="vertical"
                        primary="second"
                        allowResize={inspectorEnabled}
                        size={inspectorEnabled ? settingPane : 0}
                        minSize={300}
                        maxSize={400}
                        onDragFinished={this.handleSettingPane}
                    >
                        <Layout.Content style={{ position: 'relative', height: '100%' }}>
                            <div className="editor-view-container">
                                <Button className="editor-inspector-btn" block={true} onClick={this.handleScene} type="primary">
                                    {!inspectorEnabled ? 'Back to the Inspector' : 'Play the Scene'}
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
                            style={{ zIndex: 999, height: '100%' }}
                            collapsedWidth={0}
                            collapsed={!inspectorEnabled}
                            width={'inherit'}
                        >
                            <Setting />
                        </Layout.Sider>
                    </SplitPane>
                </SplitPane>
            </Layout>
        );
    }
}

export default Editor;
