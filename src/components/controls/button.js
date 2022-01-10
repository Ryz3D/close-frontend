import React from "react";
import * as sui from "semantic-ui-react";
import CloseRest from "../../data/closeRest";

class CButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        if (!this.props.var) {
            console.error("CButton: No var given");
        }
        if (this.props.value === undefined) {
            console.error(`CButton: No value given for var "${this.props.var}"`);
        }
    }

    send() {
        if (this.props.var && this.props.value) {
            CloseRest.varSet(this.props.var, this.props.value, this.props.forceSend);
        }
    }

    render() {
        return (
            <>
                <sui.Button inverted primary icon={this.props.icon} fluid onClick={_ => this.send()}>
                    {this.props.text || this.props.children}
                </sui.Button>
            </>
        );
    }
}

export default CButton;
