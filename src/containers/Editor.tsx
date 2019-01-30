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
                    theme="light"
                >
                    <Item />
                </Layout.Sider>
                <Layout.Content>
                    <View />
                </Layout.Content>
                <Layout.Sider
                    theme="light"
                    width={400}
                >
                    <Setting />
                </Layout.Sider>
            </Layout>
        );
    }
}

export default Editor;
