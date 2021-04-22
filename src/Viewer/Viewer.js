import React, { Component } from 'react';

import Mirador from './components/Mirador';
import UniversalViewer from './components/UniversalViewer';


class Viewer extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { manifest, viewer } = this.props

        console.log(viewer)

        if (viewer === 'mirador') {
             return <Mirador manifest={manifest} />
        } else if (viewer === 'uv') {
            return <UniversalViewer manifest={manifest} />
        } else {
            return (
                <React.Fragment>
                    Viewer, "{viewer}" is not currently configured to work with IIIF-WP.
                </React.Fragment>
            );
        }
    }
}

export default Viewer;