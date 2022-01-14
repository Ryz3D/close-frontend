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
            colorTime: 0.2,
        };
        if (!this.props.var) {
            console.error("CToggle: No var given");
        }
        this.darkLast = this.props.dark;
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

    shouldComponentUpdate() {
        if (this.props.dark !== this.darkLast) {
            this.setState({ colorTime: 1 });
            setTimeout(_ => {
                this.setState({ colorTime: 0.2 });
            }, 1000);
            this.darkLast = this.props.dark;
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
            transition: `background-color ${this.state.colorTime}s, color 1s`,
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
