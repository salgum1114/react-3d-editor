import React, { Component } from 'react';
import { Tabs, Icon } from 'antd';
import { Properties } from '../components/property';
import { Assets } from '../components/asset';

class Setting extends Component {
    render() {
        return (
            <Tabs
                style={{
                    height: '100%',
                }}
                tabPosition="right"
            >
                <Tabs.TabPane
                    key="setting"
                    tab={<Icon type="setting" style={{ marginRight: 0 }}/>}
                >
                    <Properties />
                </Tabs.TabPane>
                <Tabs.TabPane
                    key="asset"
                    tab={<Icon type="shop" style={{ marginRight: 0 }}/>}
                >
                    <Assets />
                </Tabs.TabPane>
            </Tabs>
        );
    }
}

export default Setting;
