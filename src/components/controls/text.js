import React from "react";
import CloseRest from "../../data/closeRest";
import TextFormatter from "../../data/textFormatter";

class CText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        if (this.props.var) {
            CloseRest.varGet(this.props.var)
                .then(value => this.setState({
                    value: value
                }));
            this.closeSub = CloseRest.varSub(this.props.var,
                value => this.setState({
                    value: value
                }));
        }
    }

    componentWillUnmount() {
        if (this.props.var) {
            this.closeSub();
        }
    }

    render() {
        const formatter = t => TextFormatter.format(t);

        if (this.state.value !== undefined) {
            return <>{formatter(this.state.value)}</>;
        }
        else if (this.props.text !== undefined) {
            return <>{formatter(this.props.text)}</>;
        }
        else {
            return <></>;
        }
    }
}

export default CText;
