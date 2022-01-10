import React from "react";
import * as sui from "semantic-ui-react";
import GridComponent from "./gridComponent";
import CSlider from './controls/slider';
import CButton from './controls/button';
import CText from './controls/text';

class LayoutView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.layout === undefined) {
            return <></>;
        }
        switch (Object.keys(this.props.layout)[0]) {
            case "grid":
                return (
                    <sui.Grid padded>
                        <GridComponent layout={this.props.layout.grid} />
                    </sui.Grid>
                );
            case "slider":
                return <CSlider />
            case "button":
                return
            default:
                return <>Unknown Layout "{Object.keys(this.props.layout)[0]}"</>
        }
    }
}

export default LayoutView;
