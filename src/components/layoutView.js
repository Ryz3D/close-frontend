import React from "react";
import GridComponent from "./gridComponent";
import Control from './control';
import reactWindowSize from 'react-window-size';

class LayoutView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const gridRoot = {
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, 0)',
            maxWidth: '1000px',
            width: this.props.windowWidth > 600 ? '85%' : '95%',
        };

        if (this.props.layout === undefined) {
            return <></>;
        }
        switch (Object.keys(this.props.layout)[0]) {
            case "grid":
                return (
                    <div style={gridRoot}>
                        <GridComponent layout={this.props.layout.grid} padded={this.props.windowWidth > 600} first={true} />
                    </div>
                );
            default:
                return (
                    <Control {...Object.entries(this.props.layout)[0][1]} />
                );
        }
    }
}

export default reactWindowSize(LayoutView);
