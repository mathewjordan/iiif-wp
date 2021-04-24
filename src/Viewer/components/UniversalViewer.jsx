import React, { Component } from 'react'
import UVComponent from 'universalviewer'

export default class UniversalViewer extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        console.log(this.props)

        return (
          <UVComponent
            id="uv"
            root="/static/uv"
            configUri={{
                "options": {
                    "headerPanelEnabled": false,
                    "termsOfUseEnabled": false
                },
                "modules": {
                    "headerPanel": {
                        "options": {
                            "localeToggleEnabled": false
                        }
                    },
                    "footerPanel": {
                        "options": {
                            "downloadEnabled": true
                        }
                    }
                }
            }}
            manifest={this.props.manifest}
          />
        );
    }
}
