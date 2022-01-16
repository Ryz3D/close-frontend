import React from "react";
import * as sui from "semantic-ui-react";
import CButton from "./controls/button";
import CButtonGroup from "./controls/buttonGroup";
import CSlider from "./controls/slider";
import CToggle from "./controls/toggle";
import CNotImplemented from "./controls/notImplemented";
import CText from "./controls/text";
import CHeader from "./controls/header";
import CColorSB from "./controls/color-sb";

class Control extends React.Component {
    render() {
        var component = {
            "button": CButton,
            "buttongroup": CButtonGroup,
            "toggle": CToggle,
            "slider": CSlider,
            "text": CText,
            "header": CHeader,
            "color-sb": CColorSB,
        }[this.props.type];
        if (component === undefined) {
            component = CNotImplemented;
        }

        const card = {
            backgroundColor: this.props.dark ? '#151515' : '',
            textAlign: 'center',
            boxShadow: 'none',
            transition: 'background-color 1s',
        };

        return (
            <sui.Card raised fluid style={card}>
                {this.props.header !== undefined &&
                    <sui.Card.Header>
                        <sui.Header textAlign="center" size="large" inverted={this.props.dark}
                            style={{ margin: '10px', transition: 'color 1s' }}>
                            {this.props.header}
                        </sui.Header>
                    </sui.Card.Header>
                }
                <sui.Card.Content>
                    <div style={{ position: 'relative' }}>
                        {React.createElement(component, this.props)}
                    </div>
                </sui.Card.Content>
            </sui.Card>
        );
    }
}

export default Control;
