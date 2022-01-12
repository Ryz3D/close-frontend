import React from "react";
import * as sui from "semantic-ui-react";
import CloseRest from "../../data/closeRest";
import TextFormatter from "../../data/textFormatter";

class CButton extends React.Component {
    constructor(props) {
        super(props);
        if (!this.props.var) {
            console.error("CButton: No var given");
        }
        if (this.props.value === undefined) {
            console.error(`CButton: No value given for var "${this.props.var}"`);
        }
    }

    send() {
        if (this.props.var && this.props.value !== undefined) {
            CloseRest.varSet(this.props.var, this.props.value, this.props.forceSend);
        }
    }

    render() {
        const btn = {
            maxWidth: this.props.iscol ? '' : 'min(20vw, 250px)',
            height: '60px',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        };

        return (
            <>
                <sui.Button inverted primary icon={this.props.icon} style={btn} fluid={!this.props.nonFluid} onClick={_ => this.send()}>
                    {TextFormatter.format(this.props.text || this.props.children)}
                </sui.Button>
            </>
        );
    }
}

export default CButton;
