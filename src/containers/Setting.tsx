import React, { Component } from 'react';
import { Tabs, Icon } from 'antd';

class Setting extends Component {
    render() {
        return (
            <div className="editor-setting-container">
                <Tabs
                    tabPosition="right"
                >
                    <Tabs.TabPane
                        key="setting"
                        tab={<Icon type="setting" style={{ marginRight: 0 }}/>}
                    >
                        <div>
                            <div></div>
                            <div>Setting</div>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        key="asset"
                        tab={<Icon type="shop" style={{ marginRight: 0 }}/>}
                    >
                        <div>
                            <div></div>
                            <div>Asset</div>
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Setting;
