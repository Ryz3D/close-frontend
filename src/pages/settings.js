import React from 'react';
import reactWindowSize from 'react-window-size';
import * as sui from 'semantic-ui-react';
import Header from '../components/header';

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const inputField = {
            width: this.props.windowWidth > 1200 ? "60%" : "85%",
        };

        return (
            <div>
                <Header>
                    Settings
                </Header>
                <sui.Form>
                    <sui.Label><sui.Icon name="columns" />Homepage</sui.Label>
                    <sui.Dropdown labeled
                        options={[
                            {text: "a", value: "a"}
                        ]} />
                </sui.Form>
            </div>
        );
    }
}

export default reactWindowSize(SettingsPage);
