import React from 'react';
import { Link } from 'react-router-dom';
import reactWindowSize from 'react-window-size';
import * as sui from 'semantic-ui-react';
import CloseRest from '../data/closeRest';

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
            dark: parseInt(localStorage.getItem("dark")) || 0,
            darkVar: localStorage.getItem("darkVar") || "",
            darkAbove: parseInt(localStorage.getItem("darkAbove")) || false,
            darkLimit: parseFloat(localStorage.getItem("darkLimit")) || 0,
            darkChanged: false,
            vars: [],
        };
    }

    componentDidMount() {
        CloseRest.varList()
            .then(l => {
                if (l !== undefined) {
                    this.setState({
                        vars: l,
                    })
                }
            });
    }

    save() {
        localStorage.setItem("sidebarSettings", this.state.sidebar);
        localStorage.setItem("disableSidebarHide", this.state.hideSidebar ? "0" : "1");
        localStorage.setItem("dark", this.state.dark);
        localStorage.setItem("darkVar", this.state.darkVar);
        localStorage.setItem("darkAbove", this.state.darkAbove ? "1" : "0");
        localStorage.setItem("darkLimit", this.state.darkLimit);

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
                <sui.Form style={form} inverted={this.props.dark}>
                    <sui.Button inverted primary as={Link} to="/homeSet?b=settings" onClick={_ => this.save()}>
                        Set Homepage
                        <sui.Icon name="right arrow" />
                    </sui.Button>
                    {this.state.darkChanged && this.state.saved &&
                        <sui.Button floated="right" positive onClick={_ => window.location.reload()}>
                            Reload page to apply changes
                            <sui.Icon loading name="refresh" style={{ marginLeft: '10px', marginRight: '0' }} />
                        </sui.Button>
                    }
                    <br />
                    <br />
                    <sui.Form.Field>
                        <label>Sidebar Behaviour:</label>
                        <sui.Dropdown fluid button header="Behaviour" style={{ backgroundColor: '#fff' }}
                            selection value={this.state.sidebar}
                            onChange={(_, { value }) => this.setState({
                                sidebar: value,
                                saved: false,
                            })}
                            options={[
                                { text: <><sui.Icon name='save' />Save state</>, value: 0, key: 0 },
                                { text: <><sui.Icon name='hide' />Initially closed</>, value: 1, key: 1 },
                                { text: <><sui.Icon name='unhide' />Initially open</>, value: 2, key: 2 },
                            ]} />
                    </sui.Form.Field>
                    <sui.Form.Field>
                        <label>Dark mode:</label>
                        <sui.Dropdown fluid button header="Dark mode" style={{ backgroundColor: '#fff' }}
                            selection value={this.state.dark}
                            onChange={(_, { value }) => this.setState({
                                dark: value,
                                darkChanged: true,
                                saved: false,
                            })}
                            options={[
                                { text: <><sui.Icon name='clone outline' />Never</>, value: 0, key: 0 },
                                { text: <><sui.Icon name='clone' />Always</>, value: 1, key: 1 },
                                { text: <><sui.Icon name='sitemap' />Variable</>, value: 2, key: 2 },
                            ]} />
                    </sui.Form.Field>
                    <sui.Form.Field>
                        <label>Dark mode variable:</label>
                        <sui.Dropdown fluid button header="Variable" style={{ backgroundColor: '#fff' }}
                            selection value={this.state.darkVar} disabled={this.state.dark !== 2}
                            onChange={(_, { value }) => this.setState({
                                darkVar: value,
                                darkChanged: true,
                                saved: false,
                            })}
                            options={this.state.vars.sort().map(v => ({
                                text: <><sui.Icon name='sitemap' />{v}</>,
                                value: v,
                            }))} />
                    </sui.Form.Field>
                    <sui.Form.Field inline>
                        <label>Dark mode limit:</label>
                        <div>
                            <sui.Button inverted secondary style={{ verticalAlign: 'middle' }}
                                onClick={_ => this.setState({ darkAbove: !this.state.darkAbove, darkChanged: true })}>
                                {this.state.darkAbove ? 'Above' : 'Below'}
                            </sui.Button>
                            <sui.Input type="number" placeholder="Compare to" step={0.01} onKeyDown={e => { if (e.keyCode === 13) { e.preventDefault(); } }}
                                value={this.state.darkLimit} onChange={e => this.setState({ darkLimit: e.target.value, darkChanged: true })} />
                        </div>
                    </sui.Form.Field>
                    <br />
                    <sui.Form.Field>
                        <label>Hide Sidebar in slim window</label>
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
