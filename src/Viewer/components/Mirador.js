import React, { Component } from 'react';
import mirador from 'mirador';

class Mirador extends Component {

    constructor(props) {
        super(props);
        this.miradorInstance = null;
    }

    componentDidMount() {

        this.miradorInstance = mirador.viewer(this.props.config, this.props.plugins);
        this.miradorInstance.store.subscribe(() => {
            const state = this.miradorInstance.store.getState();
            console.log(state.windows);
        });
        // Hacky example of waiting a specified time to add a window... Don't do this for real
        setTimeout(() => {
            this.miradorInstance.store.dispatch(
                this.miradorInstance.actions.addWindow()
            );
        }, 10000);
    }

    render() {
        return <div id={this.props.config.id} />;
    }
}

export default Mirador;