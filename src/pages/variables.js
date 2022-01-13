import React from 'react';
import * as sui from 'semantic-ui-react';
import CloseRest from '../data/closeRest';

class VariablesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vars: {},
            edit: undefined,
            editValue: "",
            editLoading: false,
        };
        this.inputRef = React.createRef();
    }

    reloadVars() {
        CloseRest.varList()
            .then(vars => {
                if (vars !== undefined) {
                    for (var v of vars) {
                        const id = v;
                        CloseRest.varGet(id)
                            .then(data => {
                                const newVars = { ...this.state.vars };
                                newVars[id] = data;
                                this.setState({
                                    vars: newVars,
                                });
                            });
                    }
                }
            });
    }

    componentDidMount() {
        this.reloadVars();
    }

    cancelEdit() {
        this.setState({
            edit: undefined,
            editValue: "",
            editLoading: false,
        });
    }

    saveEdit() {
        this.setState({
            editLoading: true,
        }, _ => {
            CloseRest.varSet(this.state.edit, this.state.editValue, true)
                .then(_ => {
                    CloseRest.varGet(this.state.edit)
                        .then(d => {
                            this.setState({
                                edit: undefined,
                                editValue: "",
                                editLoading: false,
                                vars: { ...this.state.vars, [this.state.edit]: d },
                            });
                        });
                });
        });
    }

    handleEditKey(e) {
        if (e.keyCode === 13) {
            this.saveEdit();
        }
    }

    render() {
        return (
            <div>
                <sui.Modal open={this.state.edit ? true : false} onClose={_ => this.cancelEdit()}>
                    <sui.Modal.Header>
                        Editing var '{this.state.edit}'
                    </sui.Modal.Header>
                    <sui.Modal.Content>
                        <sui.Input fluid label="Value" value={this.state.editValue} focus ref={this.inputRef}
                            onChange={e => this.setState({ editValue: e.target.value })} onKeyDown={e => this.handleEditKey(e)} />
                    </sui.Modal.Content>
                    <sui.Modal.Actions>
                        <sui.Button onClick={_ => this.cancelEdit()}
                            disabled={this.state.editLoading}>
                            <sui.Icon name="x" />
                            Cancel
                        </sui.Button>
                        <sui.Button primary onClick={_ => this.saveEdit()}
                            disabled={this.state.editLoading} loading={this.state.editLoading}>
                            <sui.Icon name="send" />
                            Send
                        </sui.Button>
                    </sui.Modal.Actions>
                </sui.Modal>

                <sui.Grid celled="internally" centered columns={2} style={{ color: this.props.dark ? '#fff' : '' }}>
                    <sui.Grid.Row columns={2}>
                        <sui.Grid.Column style={{ textAlign: 'right' }}>
                            <b>ID</b>
                        </sui.Grid.Column>
                        <sui.Grid.Column>
                            <b>Value</b>
                        </sui.Grid.Column>
                    </sui.Grid.Row>
                    {Object.keys(this.state.vars).sort().map(v => (
                        <sui.Grid.Row columns={2}>
                            <sui.Grid.Column style={{
                                overflow: 'hidden',
                                textAlign: 'right',
                                marginTop: this.state.vars[v] === undefined ? '3px' : '8px'
                            }}>
                                {v}
                            </sui.Grid.Column>
                            <sui.Grid.Column style={{
                                overflow: 'hidden',
                            }}>
                                <sui.Button basic={!this.props.dark} secondary={this.props.dark}
                                    inverted={this.props.dark} onClick={_ => this.setState({
                                        edit: v,
                                        editValue: this.state.vars[v],
                                    }, _ => this.inputRef.current.select())}>
                                    {this.state.vars[v]}
                                </sui.Button>
                            </sui.Grid.Column>
                        </sui.Grid.Row>
                    ))}
                </sui.Grid>
            </div>
        );
    }
}

export default VariablesPage;
