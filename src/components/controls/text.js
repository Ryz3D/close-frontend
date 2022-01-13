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
            CloseRest.varGet(this.props.var).then(value => this.setState({ value }));
            this.closeSub = CloseRest.varSub(this.props.var, value => this.setState({ value }));
        }
    }

    componentWillUnmount() {
        if (this.props.var) {
            this.closeSub();
        }
    }

    render() {
        const formatter = t => TextFormatter.format(t);

        const text = {
            color: this.props.dark ? '#fff' : '',
            transition: 'color 1s',
        };

        if (this.state.value !== undefined) {
            return <div style={text}>{formatter(this.state.value)}</div>;
        }
        else if (this.props.text !== undefined) {
            return <div style={text}>{formatter(this.props.text)}</div>;
        }
        else {
            return <></>;
        }
    }
}

export default CText;
