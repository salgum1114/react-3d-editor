import React from 'react';
import { Button } from 'antd';
import Icon from 'polestar-icons';

import Empty from './Empty';

export interface AddEmptyProps {
    onClick?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const AddEmpty: React.SFC<AddEmptyProps> = props => {
    const { children, onClick } = props;
    return (
        <Empty>
            <Button type="primary" onClick={onClick}>
                {
                    children || (
                        <>
                            <Icon name="plus" style={{ marginRight: 4 }} />
                            {'New Asset'}
                        </>
                    )
                }
            </Button>
        </Empty>
    );
};

export default AddEmpty;
