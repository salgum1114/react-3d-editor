import React, { useState } from 'react';
import AceEditor, { AceEditorProps } from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/chrome';

export type InputScriptProps = AceEditorProps;

const InputScript: React.SFC<InputScriptProps> = props => {
    const { height = '100px', onChange, ...other } = props;
    const [value, setValue] = useState('');
    return (
        <AceEditor
            {...other}
            height={height}
            mode="javascript"
            theme="chrome"
            value={value}
            onChange={value => { setValue(value); onChange(value); }}
            editorProps={{
                $blockScrolling: true,
            }}
        />
    );
};

export default InputScript;
