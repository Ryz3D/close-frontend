import React from 'react';
import * as sui from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CloseRest from '../data/closeRest';
import logo from '../img/logo.png';

class UIComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setup: {},
            sidebar: (localStorage.getItem("sidebar") || "1") === "1",
        };
    }

    componentDidMount() {
        CloseRest.setup()
            .then(setup => this.setState({ setup: setup || {} }));
    }

    toggleSidebar() {
        this.setState({
            sidebar: !this.state.sidebar,
        }, _ => {
            localStorage.setItem("sidebar", this.state.sidebar ? "1" : "0");
        });
    }

    render() {
        const path = document.location.pathname;

        const screenSize = {
            position: 'fixed',
            top: 0,
            left: 0,
            minWidth: '100vw',
            minHeight: '100vh',
        };
        const root = {
            ...screenSize,
            backgroundColor: '#ddd',
        };
        const sidebarBtn = {
            position: "fixed",
            top: "2mm",
            left: "2mm",
            zIndex: 10,
            backgroundColor: "#9f35ccb0",
            transition: "opacity 1s",
        };
        const sidebarBtn1 = {
            ...sidebarBtn,
        };
        const sidebarBtn2 = {
            ...sidebarBtn,
            opacity: this.state.sidebar ? 0 : 1,
        };
        const pages = [
            { key: "/", name: "Home", icon: "home" },
            { key: "/pages", name: "Pages", icon: "columns" },
            { key: "/variables", name: "Variables", icon: "sitemap" },
            { key: "/settings", name: "Settings", icon: "settings" },
            { key: "/about", name: "About", icon: "info" },
        ];

        return (
            <>
                <Helmet>
                    <title>
                        {this.state.setup.name || "closedHAB"}
                    </title>
                </Helmet>
                <sui.Sidebar.Pushable style={{ ...screenSize, overflow: "hidden" }}>
                    <sui.Sidebar width="thin" animation="slide out" inverted vertical visible={this.state.sidebar} as={sui.Menu}>
                        <sui.Button style={sidebarBtn1} size="tiny" circular icon="x" onClick={_ => this.toggleSidebar()} />
                        <sui.Menu.Header>
                            <sui.Header inverted textAlign="center" style={{ marginTop: "12mm", marginBottom: "10px" }}>
                                <sui.Image src={logo} />
                                <br />
                                closedHAB
                            </sui.Header>
                        </sui.Menu.Header>
                        {pages.map(p =>
                            <sui.Menu.Item key={p.key} active={path === p.key} as={Link} to={p.key}>
                                <sui.Icon name={p.icon} />
                                {p.name}
                            </sui.Menu.Item>
                        )}
                    </sui.Sidebar>

                    <sui.Sidebar.Pusher style={root}>
                        <sui.Button style={sidebarBtn2} size="small" circular icon="sidebar" onClick={_ => this.toggleSidebar()} />
                        {this.props.children}
                    </sui.Sidebar.Pusher>
                </sui.Sidebar.Pushable>
            </>
        );
    }
}

export default UIComponent;
