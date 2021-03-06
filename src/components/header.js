import React from "react";
import * as sui from "semantic-ui-react";

class Header extends React.Component {
    render() {
        const noSelect = {
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
            MsUserSelect: 'none',
            userSelect: 'none',
            OUserSelect: 'none',
        };
        const header = {
            ...noSelect,
            position: 'absolute',
            left: this.props.sidebar ? '5mm' : '17mm',
            right: '5mm',
            margin: '15px 0',
            color: this.props.sub ? "#9f35ccb0" : undefined,
            transition: 'right 500ms ease, left 500ms ease, color 1s',
        };
        const buffer = {
            width: '100%',
            height: this.props.sub ? 'calc(1.1em + 15px)' : 'calc(2em + 45px)',
        };

        return (
            <>
                <div style={buffer}>
                    <sui.Header style={header} size="huge" inverted={this.props.inverted}
                        subheader={this.props.sub ? this.props.children : undefined} dividing={!this.props.sub}>
                        {this.props.sub ? undefined : this.props.children}
                    </sui.Header>
                </div>
            </>
        );
    }
}

export default Header;
