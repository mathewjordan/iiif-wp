import React from 'react';
import ReactDOM from 'react-dom';

import Viewer from './Viewer';

if (document.getElementById('viewer')) {

    const container = document.getElementById('viewer');
    const manifest = container.getAttribute('data-manifest')
    const viewer = container.getAttribute('data-viewer');

    ReactDOM.render(
        <Viewer
            manifest={manifest}
            viewer={viewer}
            />,
        document.getElementById('viewer'));
}

module.hot.accept();
