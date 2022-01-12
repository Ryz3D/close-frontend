import React from 'react';
import { Link } from 'react-router-dom';
import reactWindowSize from 'react-window-size';
import * as sui from 'semantic-ui-react';

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);
        var sidebar = parseInt(localStorage.getItem("sidebarSettings"));
        if (isNaN(sidebar)) {
            sidebar = 0;
        }
        this.state = {
            sidebar,
            hideSidebar: !parseInt(localStorage.getItem("disableSidebarHide")),
            saved: false,
        };
    }

    save() {
        localStorage.setItem("sidebarSettings", this.state.sidebar.toString());
        localStorage.setItem("disableSidebarHide", this.state.hideSidebar ? "0" : "1");
        this.setState({
            saved: true,
        });
    }

    render() {
        const form = {
            width: '80%',
            margin: 'auto',
        };

        return (
            <div>
                <sui.Form style={form}>
                    <sui.Button inverted primary as={Link} to="/homeSet?b=settings" onClick={_ => this.save()}>
                        Set Homepage
                        <sui.Icon name="right arrow" />
                    </sui.Button>
                    <br />
                    <br />
                    <sui.Form.Field>
                        <label>Sidebar Behaviour:</label>
                        <sui.Dropdown fluid button header="Behaviour" style={{ backgroundColor: '#fff' }}
                            selection value={this.state.sidebar}
                            onChange={(e, { value }) => this.setState({
                                sidebar: value,
                                saved: false,
                            })}
                            options={[
                                { text: <><sui.Icon name='save' />Save state</>, value: 0, key: 0 },
                                { text: <><sui.Icon name='hide' />Initially closed</>, value: 1, key: 1 },
                                { text: <><sui.Icon name='unhide' />Initially open</>, value: 2, key: 2 },
                            ]} />
                    </sui.Form.Field>
                    <br />
                    <sui.Form.Field>
                        <label>Hide Sidebar with slim screen</label>
                        <sui.Checkbox toggle checked={this.state.hideSidebar}
                            onChange={(_, { checked }) => this.setState({
                                hideSidebar: checked,
                                saved: false,
                            })} />
                    </sui.Form.Field>
                    <br />
                    <br />
                    <sui.Button animated="fade" primary onClick={_ => this.save()} disabled={this.state.saved}>
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
