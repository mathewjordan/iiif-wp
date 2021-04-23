import React, { Component } from 'react';

import Mirador from './components/Mirador';
import UniversalViewer from './components/UniversalViewer';

class Viewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        }
    }

    componentDidMount() {

        const container = document.getElementById(this.props.blockId);

        this.setState({
            blockId: this.props.blockId,
            label: container.getAttribute('data-label'),
            preview: container.getAttribute('data-preview'),
            summary: container.getAttribute('data-summary'),
            manifest: container.getAttribute('data-manifest'),
            viewer: container.getAttribute('data-viewer'),
            mode: container.getAttribute('data-mode')
        })

    }

    render() {

        let {active, label, preview, summary, manifest, viewer, mode} = this.state

        if (this.props.blockId !== null) {
            if (active === true) {
                if (viewer === 'mirador') {

                    const config = {
                        id: blockId,
                        window: {
                            allowClose: false,
                            allowMaximize: true,
                            allowFullscreen: true,
                            sideBarPanel: 'info',
                            hideWindowTitle: false,
                            sideBarOpen: false,
                            highlightAllAnnotations: true,
                            forceDrawAnnotations: true,
                        },
                        windows: [
                            {
                                loadedManifest: manifest,
                            },
                        ],
                        workspaceControlPanel: {
                            enabled: false,
                        },
                    };

                    const plugins=[];

                    return <Mirador config={config} plugins={plugins} />

                } else if (viewer === 'uv') {
                    return <UniversalViewer manifest={manifest} />

                } else {
                    return (
                        <React.Fragment>
                            Viewer, "{viewer}" is not currently configured to work with IIIF-WP.
                        </React.Fragment>
                    );
                }
            } else {

                return (
                    <figure>
                        <div className="iiif-wp-preview">
                            <div className="iiif-wp-preview-inner">
                                <img src={preview} alt={label} />
                                <a href="#">Expand in Viewer</a>
                            </div>
                        </div>
                        <figcaption>
                            <span><strong>{label}</strong></span>
                            <p>{summary}</p>
                        </figcaption>
                    </figure>
                )
            }
        } else {
            return null
        }
    }
}

export default Viewer;
