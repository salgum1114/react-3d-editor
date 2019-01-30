import React from 'react';
import { Omit } from '../../types/utils';

export interface IContainerProps extends Omit<React.HTMLProps<HTMLElement>, 'title' | 'content'> {
    title?: React.ReactNode;
    titleStyle?: React.CSSProperties;
    content?: React.ReactNode;
    contentStyle?: React.CSSProperties;
}

const Container: React.SFC<IContainerProps> = props => {
    const {
        title,
        titleStyle,
        content,
        contentStyle,
        children,
    } = props;
    return (
        <div className="editor-setting-container">
            <div className="editor-setting-title" style={titleStyle}>{title}</div>
            <div className="editor-setting-content" style={contentStyle}>{children || content}</div>
        </div>
    )
};

export default Container;
