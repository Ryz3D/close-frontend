import React from 'react';
import { Link } from 'react-router-dom';
import reactWindowSize from 'react-window-size';
import * as sui from 'semantic-ui-react';
import Header from '../components/header';

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    save() {
    }

    render() {
        const form = {
            width: '80%',
            margin: 'auto',
        };

        return (
            <div>
                <sui.Form style={form}>
                    <sui.Button primary as={Link} to="/homeSet" onClick={_ => this.save()}>
                        Set Homepage
                        <sui.Icon name="right arrow" />
                    </sui.Button>
                    <br />
                    <br />
                    <sui.Button animated="fade" primary onClick={_ => this.save()}>
                        <sui.Button.Content visible>
                            Save
                        </sui.Button.Content>
                        <sui.Button.Content hidden>
                            <sui.Icon name="check" />
                        </sui.Button.Content>
                    </sui.Button>
                </sui.Form>
            </div>
        );
    }
}

export default reactWindowSize(SettingsPage);
