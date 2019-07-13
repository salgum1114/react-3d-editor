import React from 'react';
import { Omit } from '../../types/utils';
import Scrollbar from './Scrollbar';

export interface ISidebarContainerProps extends Omit<React.HTMLProps<HTMLElement>, 'title' | 'content'> {
    style?: React.CSSProperties;
    title?: React.ReactNode;
    titleStyle?: React.CSSProperties;
    content?: React.ReactNode;
    contentStyle?: React.CSSProperties;
}

const SidebarContainer: React.SFC<ISidebarContainerProps> = props => {
    const {
        style,
        title,
        titleStyle,
        content,
        contentStyle,
        children,
    } = props;
    return (
        <div className="editor-setting-panel" style={style}>
            <div className="editor-setting-panel-title" style={titleStyle}>
                {title}
            </div>
            <div className="editor-setting-panel-content" style={contentStyle}>
                <Scrollbar>
                    {children || content}
                </Scrollbar>
            </div>
        </div>
    )
};

export default SidebarContainer;
