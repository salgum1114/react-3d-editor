import React, { Component } from 'react';
import { Tabs, Icon } from 'antd';
import { Property } from '../components/property';
import { Asset } from '../components/asset';

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
                    <Property />
                </Tabs.TabPane>
                <Tabs.TabPane
                    key="asset"
                    tab={<Icon type="shop" style={{ marginRight: 0 }}/>}
                >
                    <Asset />
                </Tabs.TabPane>
            </Tabs>
        );
    }
}

export default Setting;
