import React from "react";
import * as sui from "semantic-ui-react";
import CButton from "./controls/button";
import CButtonGroup from "./controls/buttonGroup";
import CSlider from "./controls/slider";
import CToggle from "./controls/toggle";
import CNotImplemented from "./controls/notImplemented";
import CText from "./controls/text";
import CHeader from "./controls/header";

class Control extends React.Component {
    render() {
        var component = {
            button: CButton,
            buttongroup: CButtonGroup,
            toggle: CToggle,
            slider: CSlider,
            text: CText,
            header: CHeader,
        }[this.props.type];
        if (component === undefined) {
            component = CNotImplemented;
        }

        const card = {
            backgroundColor: this.props.inverted ? '#222' : '',
            textAlign: 'center',
        };

        return (
            <sui.Card raised fluid style={card}>
                {this.props.header !== undefined &&
                    <sui.Card.Header>
                        <sui.Header textAlign="center" size="large" style={{ margin: '10px' }}>
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
