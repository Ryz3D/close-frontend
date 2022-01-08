import React from 'react';
import * as sui from 'semantic-ui-react';
import Header from '../components/header';

class VariablesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Header>
                    Variables
                </Header>
            </div>
        );
    }
}

export default VariablesPage;
