import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import Editor from './containers/Editor';

class App extends Component<{}, {}> {
    render() {
        return (
            <div className="container">
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="manifest" href="./manifest.json" />
                    <link rel="shortcut icon" href="./favicon.ico" />
                    <link rel="stylesheet" href="http://fonts.googleapis.com/earlyaccess/notosanskr.css" />
                    <title>React 3D Editor</title>
                </Helmet>
                <Editor />
            </div>
        );
    }
}

export default App;
