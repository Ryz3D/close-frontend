import React from 'react';
import * as sui from 'semantic-ui-react';
import Header from '../components/header';

class PagesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Header>
                    Pages
                </Header>
            </div>
        );
    }
}

export default PagesPage;
