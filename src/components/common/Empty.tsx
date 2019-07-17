import React from 'react';
import { Empty as AntEmpty } from 'antd';
import { EmptyProps } from 'antd/lib/empty';

const Empty: React.SFC<EmptyProps> = props => {
    const { children, ...other } = props;
    return (
        <div className="editor-empty">
            <AntEmpty {...other}>
                {children}
            </AntEmpty>
        </div>
    );
};

export default Empty;
