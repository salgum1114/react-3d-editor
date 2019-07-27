import React from 'react';

const shortcuts = [
    [
        { key: ['w'], description: 'Translate' },
        { key: ['e'], description: 'Rotate' },
        { key: ['r'], description: 'Scale' },
        { key: ['d'], description: 'Duplicate selected entity' },
        { key: ['f'], description: 'Focus on selected entity' },
        { key: ['g'], description: 'Toggle grid visibility' },
        { key: ['n'], description: 'Add new entity' },
        { key: ['o'], description: 'Toggle local between global transform' },
        { key: ['supr | backspace'], description: 'Delete selected entity' }
    ],
    [
        { key: ['0'], description: 'Toggle panels' },
        { key: ['1'], description: 'Perspective view' },
        { key: ['2'], description: 'Left view' },
        { key: ['3'], description: 'Right view' },
        { key: ['4'], description: 'Top view' },
        { key: ['5'], description: 'Bottom view' },
        { key: ['6'], description: 'Back view' },
        { key: ['7'], description: 'Front view' },
        { key: ['ctrl | cmd', 'x'], description: 'Cut selected entity' },
        { key: ['ctrl | cmd', 'c'], description: 'Copy selected entity' },
        { key: ['ctrl | cmd', 'v'], description: 'Paste entity' },
        { key: ['h'], description: 'Show this help' },
        { key: ['Esc'], description: 'Unselect entity' },
        { key: ['ctrl', 'alt', 'i'], description: 'Switch Edit and VR Modes' }
    ],
];

const ShortcutHelp: React.SFC = () => {
    return (
        <div className="editor-help">
            {shortcuts.map((column, idx) => {
                return (
                    <ul className="editor-help-list" key={idx}>
                        {column.map(shortcut => {
                            return (
                                <li key={shortcut.key.toString()} className="editor-help-key">
                                    {shortcut.key.map(key => {
                                        return (
                                            <kbd key={key} className="editor-help-key-unit">
                                                <span>{key}</span>
                                            </kbd>
                                        );
                                    })}
                                    <span className="editor-help-key-def">
                                        {shortcut.description}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                );
            })}
        </div>
    );
};

export default ShortcutHelp;
