import React from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';

import SavedList, { ISavedScene } from './SavedList';

interface IProps extends ModalProps {
    onClickScene?: (savedScene: ISavedScene) => void;
}

const SavedListModal: React.SFC<IProps> = props => {
    const { onClickScene, visible, ...other } = props;
    return (
        <Modal visible={visible} {...other}>
            <SavedList visible={visible} onClick={onClickScene} />
        </Modal>
    );
};

export default SavedListModal;
