import React, { Component } from 'react';
import { Layout } from 'antd';

import '../styles/index.less';
import Setting from './Setting';
import Item from './Item';
import View from './View';

class Editor extends Component {
    render() {
        return (
            <Layout>
                <Layout.Sider
                    style={{ zIndex: 9999 }}
                    theme="light"
                >
                    <Item />
                </Layout.Sider>
                <Layout.Content>
                    <View />
                </Layout.Content>
                <Layout.Sider
                    theme="light"
                    style={{ zIndex: 9999 }}
                    width={400}
                >
                    <Setting />
                </Layout.Sider>
            </Layout>
        );
    }
}

export default Editor;
