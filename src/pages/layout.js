import React from 'react';
import * as sui from 'semantic-ui-react';
import Header from '../components/header';

class LayoutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Header>
                    Layout
                </Header>
            </div>
        );
    }
}

export default LayoutPage;
