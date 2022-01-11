import React from "react";
import * as sui from "semantic-ui-react";
import TextFormatter from "../../data/textFormatter";

class CHeader extends React.Component {
    render() {
        const header = {
            margin: '5px',
        };

        return (
            <sui.Header style={header} size='large' textAlign='center'>
                {TextFormatter.format(this.props.text)}
            </sui.Header>
        );
    }
}

export default CHeader;
