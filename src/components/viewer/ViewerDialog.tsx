import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import Icon from 'polestar-icons';
import uuid from 'uuid/v4';

import { AframePortal } from '../common';
import { getEntityClipboardRepresentation } from '../../tools/EntityTools';

type ViewerTypes = 'default' | 'ar' | 'vr';

export interface ViewerDialogProps {
    type?: ViewerTypes;
    visible?: boolean;
    maskable?: boolean;
    title?: React.ReactNode;
    onClose?: (visible: boolean) => void;
}

interface IState {
    id: string;
    width: number;
    height: number;
    top: string;
    left: string;
    fullscreen: boolean;
}

class ViewerDialog extends Component<ViewerDialogProps, IState> {
    fullscreen: boolean;
    pos1: number;
    pos2: number;
    pos3: number;
    pos4: number;
    element: HTMLElement;

    static defaultProps: ViewerDialogProps = {
        type: 'default',
        visible: false,
    }

    state: IState = {
        id: uuid(),
        width: 640,
        height: 480,
        top: `${document.body.clientWidth / 2}px`,
        left: `${document.body.clientHeight / 2}px`,
        fullscreen: false,
    }

    componentDidMount() {
        this.initPosition();
        const dialogEl = document.getElementById(this.state.id);
        this.element = dialogEl;

    }

    componentDidUpdate(prevProps: ViewerDialogProps) {
        if (this.props.visible && (prevProps.visible !== this.props.visible)) {
            const { id } = this.state;
            const dialogEl = document.getElementById(id);
            this.element = dialogEl;
            this.handleDragElement(dialogEl);
        }
    }

    /**
     * @description After mounted component, set initial position
     */
    private initPosition = () => {
        this.setState({
            left: `${(document.body.clientWidth / 2) - (this.state.width / 2)}px`,
            top: `${(document.body.clientHeight / 2) - (this.state.height / 2)}px`,
        });
    }

    /**
     * @description Mouse move event in dialog element
     * @param {MouseEvent} e
     * @returns
     */
    private handleMouseMove = (e: MouseEvent) => {
        if (this.fullscreen) {
            return;
        }
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        this.pos1 = this.pos3 - e.clientX;
        this.pos2 = this.pos4 - e.clientY;
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        // set the element's new position:
        this.element.style.top = `${(this.element.offsetTop - this.pos2)}px`;
        this.element.style.left = `${(this.element.offsetLeft - this.pos1)}px`;
    }

    /**
     * @description Mouse down event in dialog element
     * @param {MouseEvent} e
     * @returns
     */
    private handleMouseDown = (e: MouseEvent) => {
        if (e.target.tagName.toLowerCase() === 'i') {
            return;
        }
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        this.element.addEventListener('mousemove', this.handleMouseMove);
        this.element.addEventListener('mouseup', this.handleMouseUp);
    }

    /**
     * @description Mouse up event in dailog element
     * @param {MouseEvent} e
     * @returns
     */
    private handleMouseUp = (e: MouseEvent) => { 
        /* stop moving when mouse button is released:*/
        this.element.removeEventListener('mouseup', this.handleMouseUp);
        this.element.removeEventListener('mousemove', this.handleMouseMove);
        if (this.fullscreen) {
            return;
        }
        let { top, left } = this.element.style;
        if (this.element.offsetLeft < 0) {
            left = '0px';
            this.element.style.left = left;
        }
        if (this.element.offsetTop < 0) {
            top = '0px';
            this.element.style.top = top;
        }
        if (document.body.clientWidth < (this.element.offsetLeft + this.element.clientWidth)) {
            left = `${document.body.clientWidth - this.element.clientWidth}px`;
            this.element.style.left = left;
        }
        if (document.body.clientHeight < (this.element.offsetTop + this.element.clientHeight)) {
            top = `${document.body.clientHeight - this.element.clientHeight}px`;
            this.element.style.top = top;
        }
        this.setState({
            left,
            top,
        });
    }

    /**
     * @description Set drag event
     * @param {HTMLElement} element
     */
    private handleDragElement = (element: HTMLElement) => {
        this.pos1 = 0;
        this.pos2 = 0;
        this.pos3 = 0;
        this.pos4 = 0;
        element.addEventListener('mousedown', this.handleMouseDown);
    }

    /**
     * @description Close callback
     */
    private handleCloseVisible = () => {
        const { onClose } = this.props;
        if (onClose) {
            onClose(false);
        }
    }

    /**
     * @description Change to fullsreen mode
     */
    private handleFullescreen = () => {
        const { fullscreen, id, width, height, left, top } = this.state;
        this.fullscreen = !fullscreen;
        if (this.fullscreen) {
            AFRAME.INSPECTOR.shortcutTools.disable();
        } else {
            AFRAME.INSPECTOR.shortcutTools.enable();
        }
        const dialogElement = document.getElementById(id);
        if (fullscreen) {
            dialogElement.style.left = left;
            dialogElement.style.top = top;
            dialogElement.style.width = `${width}px`;
            dialogElement.style.height = `${height}px`;
        } else {
            dialogElement.style.left = `0px`;
            dialogElement.style.top = `0px`;
            dialogElement.style.width = `${document.body.clientWidth}px`;
            dialogElement.style.height = `${document.body.clientHeight}px`;
        }
        this.setState({
            fullscreen: !fullscreen,
        });
    }

    /**
     * @description Render the container
     * @returns {React.ReactNode}
     */
    private renderContainer = () => {
        const { type, maskable, title } = this.props;
        const { id, width, height, top, left, fullscreen } = this.state;
        return (
            <div className="editor-dialog">
                {maskable && <div className="editor-dialog-mask" />}
                <div id={id} className="editor-dialog-container" style={{ width, height, top, left }}>
                    <div className="editor-dialog-title">{title}</div>
                    <div className="editor-dialog-dragzone">
                        <Icon
                            className="editor-icon"
                            name={fullscreen ? 'fullscreen-exit' : 'fullscreen'}
                            style={{ marginRight: 4 }}
                            onClick={this.handleFullescreen}
                        />
                        <Icon
                            className="editor-icon"
                            name="times"
                            style={{ fontSize: '1.125rem' }}
                            onClick={this.handleCloseVisible}
                        />
                    </div>
                    <div className="editor-dialog-content">
                        <AframePortal
                            style={{ width: '100%', height: '100%' }}
                            scene={getEntityClipboardRepresentation(AFRAME.INSPECTOR.sceneEl, type === 'ar')}
                            type={type}
                            load={true}
                        />
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { visible } = this.props;
        return visible ? createPortal(
            this.renderContainer(),
            document.body,
        ) : null;
    }
}

export default ViewerDialog;
