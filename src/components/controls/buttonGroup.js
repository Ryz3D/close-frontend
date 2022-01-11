import React from "react";
import * as sui from "semantic-ui-react";
import CButton from "./button";

class CButtonGroup extends React.Component {
    render() {
        return (
            <>
                <sui.Button.Group vertical={this.props.vertical}>
                    {this.props.buttons.map(p => <CButton {...p} />)}
                </sui.Button.Group>
            </>
        );
    }
}

export default CButtonGroup;
