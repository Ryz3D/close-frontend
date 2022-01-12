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
                } else if (list.find(e => e === id) === undefined) {
                    this.props.history.push("/homeSet");
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

    render() {
        if (this.state.layout === undefined) {
            return <></>;
        } else {
            return <LayoutView layout={this.state.layout} />
        }
    }
}

export default withRouter(HomePage);
