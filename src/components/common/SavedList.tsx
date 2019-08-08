import React, { Component } from 'react';
import { Spin, Input, Row, Col, Card } from 'antd';
import warning from 'warning';

import Empty from './Empty';
import Scrollbar from './Scrollbar';
import { SceneDatabase } from '../../database';

export interface ISavedScene {
    id: string;
    thumbnail: string;
    name: string;
    description: string;
    scene: string;
}

export interface SavedListProps {
    onClick?: (savedScene: ISavedScene) => void;
}

interface IState {
    loading: boolean;
    scenes: ISavedScene[];
    searchScene: string;
}

class SavedList extends Component<SavedListProps, IState> {
    state: IState = {
        loading: true,
        scenes: [],
        searchScene: '',
    }

    componentDidMount() {
        SceneDatabase.allDocs().then(response => {
            const scenes = response.rows.map(row => {
                const { doc } = row;
                return {
                    id: doc._id,
                    name: doc.name,
                    description: doc.description || '',
                    scene: doc.scene,
                    thumbnail: doc.thumbnail,
                } as ISavedScene;
            });
            this.setState({
                scenes,
                loading: false,
            });
        }).catch(error => {
            warning(true, error);
            this.setState({
                loading: false,
            });
        });
    }

    /**
     * @description Search scene
     * @param {string} searchScene
     */
    private handleSearchScene = (searchScene: string) => {
        this.setState({
            searchScene,
        });
    }

    /**
     * @description Select the scene
     * @param {*} scene
     */
    private handleSelectScene = (savedScene: any) => {
        const { onClick } = this.props;
        if (onClick) {
            onClick(savedScene);
        }
    }

    /**
     * @description Render search
     * @returns {React.ReactNode}
     */
    private renderSearch = () => {
        return (
            <div style={{ flex: 1 }}>
                <Input allowClear={true} placeholder="Search for scene..." onChange={e => this.handleSearchScene(e.target.value)} />
            </div>
        );
    }

    /**
     * @description Render scenes on card
     * @param {ISavedScene[]} scenes
     * @param {string} searchScene
     * @returns {React.ReactNode}
     */
    private renderCardItems = (scenes: ISavedScene[], searchScene: string) => {
        const items = scenes
        .filter(scene => scene.name.toLowerCase().includes(searchScene.toLowerCase())
        || scene.description.toLowerCase().includes(searchScene.toLowerCase()));
        return (
            <Scrollbar>
                {
                    items.length ? (
                        <Row gutter={16} style={{ margin: 0 }}>
                            {
                                items.map(scene => {
                                    return (
                                        <Col key={scene.id} md={24} lg={12} xl={6} onClick={() => this.handleSelectScene(scene)}>
                                            <Card
                                                hoverable={true}
                                                style={{ marginBottom: 16, height: 280 }}
                                                bodyStyle={{ height: 100 }}
                                                cover={<img src={scene.thumbnail} />}
                                            >
                                                <Card.Meta
                                                    title={scene.name}
                                                    description={scene.description}
                                                />
                                            </Card>
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    ) : <Empty />
                }
            </Scrollbar>
        );
    }

    render() {
        const { loading, scenes, searchScene } = this.state;
        return (
            <Spin spinning={loading}>
                {
                    scenes.length ? (
                        <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', padding: '0 8px 16px 8px' }}>
                                {this.renderSearch()}
                            </div>
                            <div style={{ flex: 1 }}>
                                {this.renderCardItems(scenes, searchScene)}
                            </div>
                        </div>
                    ) : <Empty />
                }
            </Spin>
        );
    }
}

export default SavedList;