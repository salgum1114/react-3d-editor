import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

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
            </div>
        );
    }
}

export default App;
