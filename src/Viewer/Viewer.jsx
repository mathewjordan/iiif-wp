import React, { Component } from 'react';

import Mirador from './components/Mirador';
import UniversalViewer from './components/UniversalViewer';

class Viewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        }

        this.handleClick = this.handleClick.bind(this);
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

    handleClick() {
        this.setState(state => ({
            active: !state.active
        }));
    }

    render() {

        let {active, label, preview, summary, manifest, viewer, mode} = this.state

        if (this.props.blockId !== null) {

            let target = this.props.blockId + '_viewer'

            if (active === true) {
                if (viewer === 'mirador') {

                    const config = {
                        id: target,
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

                    return (
                        <React.Fragment>
                            <div className="iiif-wp-viewer-inner">
                                <Mirador config={config} plugins={plugins} />
                            </div>
                            <a onClick={this.handleClick}>
                                Close Viewer
                                {this.state.active ? true : false}
                            </a>
                        </React.Fragment>
                    )

                } else if (viewer === 'uv') {

                    return (
                      <React.Fragment>
                          <div className="iiif-wp-viewer-inner">
                              <UniversalViewer manifest={manifest} />
                          </div>
                          <a onClick={this.handleClick}>
                              Close Viewer
                              {this.state.active ? true : false}
                          </a>
                      </React.Fragment>
                    )

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
                                <a onClick={this.handleClick}>
                                    Expand in Viewer
                                    {this.state.active ? true : false}
                                </a>
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
