import React, { Component } from 'react';
import { SidebarContainer } from '../common';
import { EventTools } from '../../tools';
import { IScene } from '../../tools/InpsectorTools';
import { IEntity } from '../../constants';
import { List } from 'antd';

interface IState {
    assets: IEntity[];
}

class Assets extends Component<{}, IState> {
    state: IState = {
        assets: [],
    }

    componentDidMount() {
        EventTools.on('sceneloaded', (scene: IScene) => {
            // const assets = this.buildAssets(scene);
            // this.setState({
            //     assets,
            // });
        });
    }

    private buildAssets = (scene: IScene) => {

    }

    private renderItem = (item: IEntity) => {
        return (
            <List.Item>
                <List.Item.Meta />
            </List.Item>
        );
    }

    render() {
        const { assets } = this.state;
        return (
            <SidebarContainer
                titleStyle={{ border: 0 }}
                title={'Assets'}
            >
                <List
                    dataSource={assets}
                    renderItem={this.renderItem}
                />
            </SidebarContainer>
        );
    }
}

export default Assets;
