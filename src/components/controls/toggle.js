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
            colorTime: 0.1,
        };
        if (!this.props.var) {
            console.error("CToggle: No var given");
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

    getSnapshotBeforeUpdate() {
        return { darkLast: this.props.dark };
    }

    componentDidUpdate(_, __, { darkLast }) {
        if (this.props.dark !== darkLast) {
            this.setState({ colorTime: 1 });
            setTimeout(_ => {
                this.setState({ colorTime: 0.1 });
            }, 1000);
        }
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: (!this.props.dark || this.state.value >= 0.5) ? '' : '#222',
            color: this.props.dark ? '#fff' : '',
            transition: `background-color ${this.state.colorTime}s, color ${this.state.colorTime}s`,
        };

        return (
            <>
                <sui.Button style={btn} primary={this.state.value >= 0.5}
                    fluid={!this.props.nonFluid} toggle onClick={_ => this.send()}>
                    {TextFormatter.format(this.props.text || this.props.children)}
                </sui.Button>
            </>
        );
    }
}

export default CToggle;
