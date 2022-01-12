import React from "react";
import * as sui from "semantic-ui-react";
import CButton from "./button";

class CButtonGroup extends React.Component {
    render() {
        const group = {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
        };

        return (
            <>
                <sui.Button.Group floated="left" vertical={this.props.vertical} style={group}>
                    {this.props.buttons.map(p => <CButton {...p} iscol={this.props.iscol} />)}
                </sui.Button.Group>
            </>
        );
    }
}

export default CButtonGroup;
