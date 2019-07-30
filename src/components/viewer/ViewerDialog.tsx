import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import Icon from 'polestar-icons';
import uuid from 'uuid/v4';

import { FramePortal, AframePortal } from '../common';
import { VRViewer, ARViewer, Viewer } from '.';

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
    top: string | number;
    left: string | number;
    fullscreen: boolean;
}

class ViewerDialog extends Component<ViewerDialogProps, IState> {
    static defaultProps: ViewerDialogProps = {
        type: 'default',
        visible: false,
    }

    state: IState = {
        id: uuid(),
        width: 600,
        height: 400,
        top: document.body.clientWidth / 2,
        left: document.body.clientHeight / 2,
        fullscreen: false,
    }

    componentDidMount() {
        this.initPosition();
    }

    componentDidUpdate() {
        if (this.props.visible) {
            const { id } = this.state;
            const dialogElement = document.getElementById(id);
            this.handleDragElement(dialogElement);
        }
    }

    private initPosition = () => {
        this.setState({
            left: (document.body.clientWidth / 2) - (this.state.width / 2),
            top: (document.body.clientHeight / 2) - (this.state.height / 2),
        });
    }

    private handleDragElement = (element: HTMLElement) => {
        const dragMouseDown = (e: MouseEvent) => {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }
        const elementDrag = (e: MouseEvent) => {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            element.style.top = `${(element.offsetTop - pos2)}px`;
            element.style.left = `${(element.offsetLeft - pos1)}px`;
        }
        const closeDragElement = (e: MouseEvent) => {
            let { top, left } = element.style;
            if (element.offsetLeft < 0) {
                left = `0px`;
                element.style.left = left;
            }
            if (element.offsetTop < 0) {
                top = `0px`;
                element.style.top = top;
            }
            if (document.body.clientWidth < (element.offsetLeft + element.clientWidth)) {
                left = `${document.body.clientWidth - element.clientWidth}px`;
                element.style.left = left;
            }
            if (document.body.clientHeight < (element.offsetTop + element.clientHeight)) {
                top = `${document.body.clientHeight - element.clientHeight}px`;
                element.style.top = top;
            }
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
            this.setState({
                left,
                top,
            });
        }
        let pos1 = 0;
        let pos2 = 0;
        let pos3 = 0;
        let pos4 = 0;
        const dragzoneElement = element.querySelector('.editor-dialog-dragzone') as HTMLElement;
        if (dragzoneElement) {
            /* if present, the header is where you move the DIV from:*/
            dragzoneElement.onmousedown = dragMouseDown;
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            element.onmousedown = dragMouseDown;
        }
    }

    private handleCloseVisible = () => {
        const { onClose } = this.props;
        if (onClose) {
            onClose(false);
        }
    }

    private handleFullescreen = () => {
        const { fullscreen, id, width, height, left, top } = this.state;
        const dialogElement = document.getElementById(id);
        if (fullscreen) {
            dialogElement.style.left = `${left}px`;
            dialogElement.style.top = `${top}px`;
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

    private renderViewer = (type: ViewerTypes) => {
        switch (type) {
            case 'ar':
                return (
                    <ARViewer />
                );
            case 'vr':
                return (
                    <VRViewer />
                );
            default:
                return (
                    <Viewer />
                );
        }
    }

    private renderContainer = () => {
        const { type, maskable, title } = this.props;
        const { id, width, height, top, left, fullscreen } = this.state;
        return (
            <div className="editor-dialog">
                {maskable && <div className="editor-dialog-mask" />}
                <div id={id} className="editor-dialog-container" style={{ top, left }}>
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
                            width={width}
                            height={height}
                            body={type === 'ar' ? `
                            <a-scene vr-mode-ui="false" embedded arjs="debugUIEnabled: false; sourceType: webcam;">
                                <a-marker preset='hiro'>
                                    <a-box position='0 0.5 0' material='color: green;'></a-box>
                                </a-marker>
                                <!-- define a simple camera -->
                                <a-camera-static />
                            </a-scene>
                            ` : `
                            <a-scene vr-mode-ui="false">
                                <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
                                <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
                                <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
                                <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
                                <a-sky color="#ECECEC"></a-sky>
                            </a-scene>
                            `}
                            ar={type === 'ar'}
                        >
                            {this.renderViewer(type)}
                        </AframePortal>
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
