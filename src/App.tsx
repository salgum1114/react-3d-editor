import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import Editor from './containers/Editor';

class App extends Component<{}, {}> {
    render() {
        return (
            <div className="container">
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=0.1" />
                    <link rel="manifest" href="./manifest.json" />
                    <link rel="shortcut icon" href="./favicon.ico" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css" />
                    {/* <script src="https://aframe.io/releases/0.8.2/aframe.min.js" /> */}
                    {/* <script src="https://rawgit.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js" /> */}
                    {/* <script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.0/aframe/build/aframe-ar.js" /> */}
                    <title>React 3D Editor</title>
                </Helmet>
                <Editor />
            </div>
        );
    }
}

export default App;
