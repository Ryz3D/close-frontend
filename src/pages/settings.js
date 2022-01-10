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
        return (
            <div>
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
