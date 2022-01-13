import React from 'react';
import { withRouter } from 'react-router-dom';
import CloseRest from '../data/closeRest';
import LayoutView from '../components/layoutView';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        const id = localStorage.getItem("homepage") || "";
        CloseRest.layoutList()
            .then(list => {
                if (list === undefined) {
                    this.props.history.push("/");
                } else if (list.findIndex(e => e === id) === -1) {
                    CloseRest.layoutHome()
                        .then(id => this.props.history.push(`/view?id=${id}`));
                } else {
                    CloseRest.layoutGet(id)
                        .then(layout => {
                            if (layout === undefined) {
                                CloseRest.layoutHome()
                                    .then(id => this.props.history.push(`/view?id=${id}`));
                            }
                            else {
                                this.setState({ layout });
                            }
                        });
                }
            });
    }

    render() {
        if (this.state.layout === undefined) {
            return <></>;
        } else {
            return <LayoutView layout={this.state.layout} dark={this.props.dark} />;
        }
    }
}

export default withRouter(HomePage);
