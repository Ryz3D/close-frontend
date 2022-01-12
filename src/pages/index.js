import React from 'react';
import * as sui from 'semantic-ui-react';
import Header from '../components/header';
import UIComponent from '../components/ui';
import CloseRest from '../data/closeRest';
import { withRouter } from 'react-router-dom';

class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pass: "",
            initialLoad: true,
            loginLoading: false,
            loginFailed: false,
            loggedIn: false,
        };
    }

    componentDidMount() {
        if (localStorage.getItem("auth") !== undefined) {
            this.login(localStorage.getItem("auth"), true);
        }
        else {
            this.setState({
                initialLoad: false,
            });
        }
    }

    login(auth, initial = false) {
        this.setState({
            loginLoading: true,
            loginFailed: false,
        }, _ => {
            CloseRest.auth = auth;
            CloseRest.layoutList()
                .then(l => {
                    if (l === undefined) {
                        this.setState({
                            loginFailed: !initial,
                            loginLoading: false,
                            initialLoad: false,
                        });
                    }
                    else {
                        localStorage.setItem("auth", CloseRest.auth);
                        this.props.history.push("/home");
                    }
                });
        });
    }

    render() {
        const auth = Buffer.from(`${this.state.user}:${this.state.pass}`).toString("base64");

        const form = {
            margin: 'auto',
            maxWidth: 'min(10cm, 85%)',
        };
        const button = {
            backgroundColor: '#9f35cc',
        };

        if (this.state.initialLoad) {
            return <></>;
        }

        return (
            <UIComponent loggedIn={false} header="Login" subHeader="closedHAB">
                <sui.Form style={form}>
                    <sui.Form.Input label="Username" input={{ autoComplete: "username" }}
                        onChange={e => this.setState({ user: e.target.value, loginFailed: false })}
                        disabled={this.state.loginLoading} error={this.state.loginFailed} />
                    <sui.Form.Input label="Password" input={{ autoComplete: "current-password" }}
                        type="password" onChange={e => this.setState({ pass: e.target.value, loginFailed: false })}
                        disabled={this.state.loginLoading} error={this.state.loginFailed} />

                    <sui.Form.Button style={button} floated='right' onClick={_ => this.login(auth)}
                        disabled={this.state.loginLoading} loading={this.state.loginLoading}>
                        Log in
                        <sui.Icon name="arrow right" />
                    </sui.Form.Button>
                </sui.Form>
            </UIComponent>
        );
    }
}

export default withRouter(IndexPage);
