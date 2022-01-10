import React from "react";
import * as sui from "semantic-ui-react";
import CButton from "./controls/button";
import CSlider from "./controls/slider";
import CToggle from "./controls/toggle";
import CNotImplemented from "./controls/notImplemented";

class GridComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    wrapControl(data, component) {
        var newComp = (
            <sui.Card fluid>
                <sui.Card.Header>
                    {data.header || ""}
                </sui.Card.Header>
                <sui.Card.Content>
                    {component}
                </sui.Card.Content>
            </sui.Card>
        );
        if (this.props.isRow) {
            return (
                <sui.Grid.Column>
                    {newComp}
                </sui.Grid.Column>
            );
        }
        else {
            return newComp;
        }
    }

    render() {
        var childComponents = [];
        for (var c of Object.entries(this.props.layout)) {
            if (c[1].type === undefined) {
                childComponents.push(<GridComponent isRow={!this.props.isRow} layout={c[1]} />);
            }
            else {
                var component = {
                    button: CButton,
                    toggle: CToggle,
                    slider: CSlider,
                }[c[1].type];
                if (component === undefined) {
                    console.warn(`${c[1].type} is not implemented`);
                    component = CNotImplemented;
                }
                childComponents.push(this.wrapControl(c[1], React.createElement(component, c[1])));
            }
        }

        if (this.props.isRow) {
            return (
                <sui.Grid.Row>
                    {childComponents}
                </sui.Grid.Row>
            );
        }
        else {
            return (
                <sui.Grid.Column>
                    {childComponents}
                </sui.Grid.Column>
            );
        }
    }
}

export default GridComponent;
