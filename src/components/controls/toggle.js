import "./slider.css";
import React from "react";
import * as sui from "semantic-ui-react";
import CloseRest from "../../data/closeRest";
import TextFormatter from "../../data/textFormatter";

class CToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
        if (!this.props.var) {
            console.error("CButton: No var given");
        }
    }

    componentDidMount() {
        CloseRest.varGet(this.props.var)
            .then(value => this.setState({
                value: parseFloat(value)
            }));
        this.closeSub = CloseRest.varSub(this.props.var,
            value => this.setState({
                value: parseFloat(value)
            }));
    }

    componentWillUnmount() {
        this.closeSub();
    }

    send() {
        if (this.props.var) {
            CloseRest.varSet(this.props.var, this.state.value >= 0.5 ? 0 : 1, this.props.forceSend);
        }
    }

    render() {
        const btn = {
            height: '60px',
            fontSize: '1.2rem',
        };

        return <>
            <sui.Button style={btn} primary={this.state.value >= 0.5} fluid toggle onClick={_ => this.send()}>
                {TextFormatter.format(this.props.text || this.props.children)}
            </sui.Button>
        </>;
    }
}

export default CToggle;
