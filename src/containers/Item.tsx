import React, { Component } from 'react';
import Icon from 'polestar-icons';
import SplitPane from 'react-split-pane';
import store from 'store';
import uuid from 'uuid';
import warning from 'warning';

import { Assets } from '../components/asset';
import { Entities } from '../components/entity';
import { Modal } from 'antd';
import { ShortcutHelp, SaveSceneModal, SavedListModal } from '../components/common';
import { EventTools, EntityTools } from '../tools';
import { ViewerDialog } from '../components/viewer';
import { ISavedScene } from '../components/common/SavedList';
import { SceneDatabase } from '../database';

interface IItemState {
	middlePane: number | string;
	helpModalVisible: boolean;
	arDialogVisible: boolean;
	defaultDialogVisible: boolean;
	savedModalVisible: boolean;
	saveSceneModalVisible: boolean;
	savedScene: string;
}

class Item extends Component<{}, IItemState> {
	constructor(props: {}) {
		super(props);
	}

	state: IItemState = {
		middlePane: store.get('middlePane') || '50%',
		helpModalVisible: false,
		arDialogVisible: false,
		defaultDialogVisible: false,
		savedModalVisible: false,
		saveSceneModalVisible: false,
		savedScene: '',
	};

	componentDidMount() {
		EventTools.on('openhelpmodal', () => {
			this.handleHelpModalVisible();
		});
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
	};

	/**
	 * @description Change to help modal visible
	 */
	private handleHelpModalVisible = () => {
		this.setState(prevState => {
			return {
				helpModalVisible: !prevState.helpModalVisible,
			};
		});
	};

	/**
	 * @description Change to ar dialog visible
	 */
	private handleARDialogVisible = () => {
		this.setState(prevState => {
			return {
				arDialogVisible: !prevState.arDialogVisible,
			};
		});
	};

	/**
	 * @description Change to default dialog visible
	 */
	private handleDefaultDialogVisible = () => {
		this.setState(prevState => {
			return {
				defaultDialogVisible: !prevState.defaultDialogVisible,
			};
		});
	};

	/**
	 * @description Export entity to GLTF
	 */
	private handleExportToGLTF = () => {
		EntityTools.exportToGLTF(AFRAME.INSPECTOR.sceneEl);
	};

	/**
	 * @description Save scene in list
	 */
	private handleSaveScene = async (savedScene: ISavedScene) => {
		const scene = EntityTools.getEntityClipboardRepresentation(AFRAME.INSPECTOR.sceneEl);
		const canvas = AFRAME.INSPECTOR.sceneEl.components.screenshot.getCanvas('perspective');
		const thumbnail = canvas.toDataURL('image/png', 0.5);
		try {
			await SceneDatabase.create({
				_id: uuid(),
				...savedScene,
				scene,
				thumbnail,
			});
		} catch (error) {
			warning(true, error);
		}
		this.handleSaveSceneModalVisible();
	};

	/**
	 * @description Select saved scene
	 * @param {ISavedScene} savedScene
	 */
	private handleSelectScene = (savedScene: ISavedScene) => {
		AFRAME.INSPECTOR.reload({
			sceneStr: savedScene.scene,
		});
		this.handleSavedListVisible();
	};

	/**
	 * @description Change to saved modal visible
	 */
	private handleSavedListVisible = () => {
		this.setState(prevState => {
			return {
				savedModalVisible: !prevState.savedModalVisible,
			};
		});
	};

	/**
	 * @description Change to save scene modal visible
	 */
	private handleSaveSceneModalVisible = () => {
		this.setState(prevState => {
			return {
				saveSceneModalVisible: !prevState.saveSceneModalVisible,
			};
		});
	};

	render() {
		const {
			middlePane,
			helpModalVisible,
			arDialogVisible,
			defaultDialogVisible,
			savedModalVisible,
			saveSceneModalVisible,
		} = this.state;
		return (
			<div className="editor-item-container">
				<div className="editor-item-tools">
					<div style={{ flex: 1 }}>
						<Icon className="editor-icon" name="list-alt" onClick={this.handleSavedListVisible} />
					</div>
					<div className="editor-item-tools-actions">
						<img
							style={{
								minWidth: 16,
								minHeight: 16,
								boxSizing: 'unset',
								boxShadow: 'none',
								padding: '0 6px 0 0',
								cursor: 'pointer',
							}}
							src="chrome-extension://ohcpnigalekghcmgcdcenkpelffpdolg/img/icon16.png"
							title={`Select with ColorPick Eyedropper - See advanced option: "Add ColorPick Eyedropper near input[type=color] fields on websites`}
							className="colorpick-eyedropper-input-trigger"
						/>
						<Icon className="editor-icon" name="ar" onClick={this.handleARDialogVisible} />
						<Icon className="editor-icon" name="eye" onClick={this.handleDefaultDialogVisible} />
						<Icon className="editor-icon" name="save" onClick={this.handleSaveSceneModalVisible} />
						<Icon className="editor-icon" name="gltf" onClick={this.handleExportToGLTF} />
						<Icon className="editor-icon" name="question-circle-o" onClick={this.handleHelpModalVisible} />
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
						primary="second"
					>
						<Entities />
						<Assets />
					</SplitPane>
				</div>
				<Modal
					title={'Shortcuts'}
					closable={true}
					footer={null}
					visible={helpModalVisible}
					onCancel={this.handleHelpModalVisible}
					width="50%"
				>
					<ShortcutHelp />
				</Modal>
				<SavedListModal
					className="editor-item-modal"
					title={'Saved list'}
					closable={true}
					footer={null}
					visible={savedModalVisible}
					onCancel={this.handleSavedListVisible}
					width="75%"
					style={{ height: '75%' }}
					onClickScene={this.handleSelectScene}
				/>
				<SaveSceneModal
					onOk={this.handleSaveScene}
					onCancel={this.handleSaveSceneModalVisible}
					visible={saveSceneModalVisible}
				/>
				<ViewerDialog
					type="ar"
					title="AR Preview"
					visible={arDialogVisible}
					onClose={this.handleARDialogVisible}
				/>
				<ViewerDialog
					type="default"
					title="Default Preview"
					visible={defaultDialogVisible}
					onClose={this.handleDefaultDialogVisible}
				/>
			</div>
		);
	}
}

export default Item;
