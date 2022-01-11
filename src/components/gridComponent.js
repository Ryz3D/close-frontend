import React from "react";
import * as sui from "semantic-ui-react";
import Control from "./control";

class GridComponent extends React.Component {
    render() {
        const props = {
            ...this.props,
            layout: undefined,
        };
        const iscol = this.props.isCol || this.props.first;

        var childComponents = Object.entries(this.props.layout).map(c => {
            if (c[1].type === undefined) {
                return <GridComponent {...{ ...this.props, first: false, iscol: !iscol, layout: c[1] }} />;
            }
            else {
                const comp = <Control {...c[1]} />;
                if (iscol) {
                    return <sui.Grid.Row>{comp}</sui.Grid.Row>;
                }
                else {
                    return <sui.Grid.Column>{comp}</sui.Grid.Column>;
                }
            }
        });

        if (iscol) {
            if (this.props.first) {
                return (
                    <sui.Grid {...props}>
                        {childComponents}
                    </sui.Grid>
                );
            }
            else {
                return (
                    <sui.Grid.Column {...props}>
                        {childComponents}
                    </sui.Grid.Column>
                );
            }
        }
        else {
            return (
                <sui.Grid.Row {...props} columns={(childComponents || []).length}>
                    {childComponents}
                </sui.Grid.Row>
            );
        }
    }
}

export default GridComponent;
