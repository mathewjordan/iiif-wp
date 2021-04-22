import React from 'react';
import ReactDOM from 'react-dom';

import Viewer from './Viewer';

Array.prototype.forEach.call(
    document.getElementsByClassName('iiif-wp-viewer'),
    function(el) {
        ReactDOM.render(<Viewer blockId={el.id} />, el);
    }
);

module.hot.accept();
