import React from 'react';
import * as sui from 'semantic-ui-react';
import Header from '../components/header';

class AboutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Header>
                    About
                </Header>
            </div>
        );
    }
}

export default AboutPage;
