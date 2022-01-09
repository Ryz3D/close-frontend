import React from "react";
import CloseRest from "../../data/closeRest";

class CText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
        if (!this.props.var) {
            console.error("CText: No var given");
        }
    }

    componentDidMount() {
        CloseRest.varGet(this.props.var)
            .then(value => this.setState({
                value: value
            }));
        this.closeSub = CloseRest.varSub(this.props.var,
            value => this.setState({
                value: value
            }));
    }

    componentWillUnmount() {
        this.closeSub();
    }

    render() {
        return <>{this.state.value}</>;
    }
}

export default CText;
