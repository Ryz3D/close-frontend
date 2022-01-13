import React from "react";

class CNotImplemented extends React.Component {
    render() {
        return <div style={{ color: this.props.dark ? '#fff' : '' }}>Not implemented</div>;
    }
}

export default CNotImplemented;
