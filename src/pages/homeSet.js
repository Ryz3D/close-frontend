import React from 'react';
import { Link } from 'react-router-dom';
import * as sui from 'semantic-ui-react';
import CloseRest from '../data/closeRest';
import TextFormatter from '../data/textFormatter';

class HomeSetPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layouts: [],
            selected: localStorage.getItem('homepage') || '',
            saved: false,
        };
    }

    componentDidMount() {
        CloseRest.layoutList()
            .then(list => {
                this.setState({
                    layouts: list || [],
                });
            });
    }

    save() {
        if (this.state.selected) {
            localStorage.setItem('homepage', this.state.selected);
            this.setState({
                saved: true,
            });
        }
    }

    render() {
        const back = new URLSearchParams(window.location.search).get('b');

        const form = {
            width: '80%',
            margin: 'auto',
        };

        return (
            <div>
                <sui.Form style={form}>
                    {back !== null &&
                        <>
                            <sui.Button inverted secondary as={Link} to={"/" + back}>
                                <sui.Icon name='left arrow' />
                                Back
                            </sui.Button>
                            <br />
                            <br />
                        </>
                    }
                    <sui.Form.Field>
                        <label>Select Homepage:</label>
                        <sui.Dropdown fluid button header="Layouts" style={{ backgroundColor: '#fff' }}
                            value={this.state.selected} onChange={(e, { value }) => this.setState({
                                selected: value,
                                saved: false,
                            })}
                            options={this.state.layouts.sort((a, b) => b - a).map(l => ({
                                text: TextFormatter.formatName(l),
                                value: l,
                            }))} />
                    </sui.Form.Field>
                    <br />
                    <sui.Button animated="fade" primary disabled={this.state.saved} onClick={_ => this.save()}>
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

export default HomeSetPage;
