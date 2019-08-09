import React, { Component } from 'react';

export interface DialogProps {
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

class Dialog extends Component<DialogProps, IState> {
    static defaultProps: DialogProps = {
        visible: false,
    }

    componentDidMount() {
        this.initPosition();
    }

    /**
     * @description After mounted component, initialize position
     */
    private initPosition = () => {
        this.setState({
            left: (document.body.clientWidth / 2) - (this.state.width / 2),
            top: (document.body.clientHeight / 2) - (this.state.height / 2),
        });
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Dialog;
