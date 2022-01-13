import React from 'react';
import * as sui from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import CloseRest from '../data/closeRest';
import LayoutView from '../components/layoutView';

class ViewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        const id = new URLSearchParams(window.location.search).get("id");
        if (id !== undefined) {
            CloseRest.layoutList()
                .then(list => {
                    if (list === undefined) {
                        this.props.history.push("/");
                    } else if (list.find(e => e === id) === undefined) {
                        this.props.history.push("/layouts");
                    }
                    else {
                        CloseRest.layoutGet(id)
                            .then(layout => {
                                this.setState({
                                    layout,
                                });
                            });
                    }
                });
        }
    }

    render() {
        if (this.state.layout === undefined) {
            return <></>;
        } else {
            return <LayoutView layout={this.state.layout} dark={this.props.dark} />
        }
    }
}

export default withRouter(ViewPage);
