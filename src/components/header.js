import React from "react";
import * as sui from "semantic-ui-react";

class Header extends React.Component {
    render() {
        const header = {
            marginTop: "15px",
            marginLeft: "14mm",
        };

        return (
            <sui.Header style={header} size="huge" inverted={this.props.inverted} subheader={this.props.subheader}>
                {this.props.children}
            </sui.Header>
        );
    }
}

export default Header;
