import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import GithubCorner from 'react-github-corner';

import Editor from './containers/Editor';

class App extends Component {
    render() {
        return (
            <div className="container">
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=0.1" />
                    <link rel="manifest" href="./manifest.json" />
                    <link rel="shortcut icon" href="./favicon.ico" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css" />
                    <title>React 3D Editor</title>
                    <script async={true} src="https://www.googletagmanager.com/gtag/js?id=UA-97485289-1" />
                    <script>
                        {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'UA-97485289-1');
                        `}
                    </script>
                </Helmet>
                <Editor />
                <GithubCorner
                    href="https://github.com/salgum1114/react-3d-editor"
                    target="_blank"
                    bannerColor="#08979c"
                    size={60}
                    svgStyle={{ bottom: 0, top: 'unset', transform: 'rotate(90deg)', zIndex: 9999 }}
                />
            </div>
        );
    }
}

export default App;
