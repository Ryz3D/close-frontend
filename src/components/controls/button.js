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
        if (!this.props.value) {
            console.error("CButton: No value given");
        }
    }

    render() {
        return <>
            <sui.Button style={{color: '#9f35cc'}} icon={this.props.icon}
                onClick={_ => CloseRest.varSet(this.props.var, this.props.value, this.props.forceSend)}>
                {this.props.content || this.props.children}
            </sui.Button>
        </>;
    }
}

export default CButton;
