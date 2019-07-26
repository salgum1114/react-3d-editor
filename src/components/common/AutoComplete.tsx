import React from 'react';
import { AutoComplete as AntAutoComplete, Button } from 'antd';
import { AutoCompleteProps as AntAutoCompleteProps } from 'antd/lib/auto-complete';

export interface AutoCompleteProps extends AntAutoCompleteProps {
    addonAfter?: React.ReactElement;
}

const AutoComplete: React.SFC<AutoCompleteProps> = props => {
    const { children, addonAfter, ...other } = props;
    return (
        <div className="editor-autocomplete">
            <AntAutoComplete {...other}>
                {children}
            </AntAutoComplete>
            {
                addonAfter && (
                    <Button type="primary" onClick={() => addonAfter.props.onClick && addonAfter.props.onClick()}>
                        {addonAfter}
                    </Button>
                )
            }
        </div>
    );
}

export default AutoComplete;
