import React from 'react';
import * as sui from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CloseRest from '../data/closeRest';
import TextFormatter from '../data/textFormatter';
import logo from '../img/logo.png';
import Header from './header';
import reactWindowSize from 'react-window-size';
import DarkMode from '../data/darkMode';

class UIComponent extends React.Component {
    constructor(props) {
        super(props);
        var sidebar = 0;
        switch (localStorage.getItem("sidebarSettings")) {
            default:
            case "0":
                sidebar = (localStorage.getItem("sidebar") || "1") === "1";
                break;
            case "1":
                sidebar = false;
                break;
            case "2":
                sidebar = true;
                break;
        }
        this.state = {
            setup: {},
            sidebar,
            sidebarOverride: false,
            dark: false,
        };
        this.headerRef = React.createRef();

        CloseRest.auth = localStorage.getItem("auth") || "";
        CloseRest.varSubConnect();
    }

    componentDidMount() {
        CloseRest.setup()
            .then(setup => {
                if (setup === undefined) {
                    if (window.location.pathname !== "/") {
                        window.location.pathname = "/";
                    }
                }
                else {
                    this.setState({ setup });
                    DarkMode.isDark(dark => {
                        this.setState({ dark });
                    });
                }
            });
    }

    showSidebar() {
        this.setState({
            sidebar: true,
            sidebarOverride: true,
        });
        localStorage.setItem("sidebar", "1");
    }

    hideSidebar() {
        this.setState({
            sidebar: false,
            sidebarOverride: false,
        });
        localStorage.setItem("sidebar", "0");
    }

    render() {
        const path = document.location.pathname;
        const loggedIn = this.props.loggedIn === undefined ? true : this.props.loggedIn;
        const dark = this.state.dark && this.props.component !== undefined;

        var sidebar = this.state.sidebar;
        if (this.props.windowWidth < 600) {
            if (!parseInt(localStorage.getItem("disableSidebarHide")) && !this.state.sidebarOverride) {
                sidebar = false;
            }
        }
        else if (this.state.sidebarOverride) {
            setTimeout(_ => this.setState({ sidebarOverride: false }), 0);
        }

        const screenSize = {
            position: 'fixed',
            top: '0',
            left: '0',
            minWidth: '100vw',
            minHeight: '100vh',
        };
        const pushable = {
            ...screenSize,
            overflow: 'hidden',
        };
        const root = {
            ...screenSize,
            backgroundColor: dark ? '#222' : '#ddd',
            transition: 'transform 500ms ease, background-color 1s',
        };
        const screenPusher = {
            ...screenSize,
            minWidth: '',
            right: (sidebar && loggedIn) ? '150px' : '0',
            bottom: '0',
            margin: '0',
            transition: 'right 500ms ease',
            overflow: 'hidden scroll',
        };
        const sidebarBtn = {
            position: "fixed",
            top: "4mm",
            left: "4mm",
            zIndex: 10,
            backgroundColor: "#9f35ccb0",
            transition: "opacity 1s",
        };
        const sidebarBtn1 = {
            ...sidebarBtn,
        };
        const sidebarBtn2 = {
            ...sidebarBtn,
            opacity: sidebar ? 0 : 1,
        };
        const noSelect = {
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
            MsUserSelect: 'none',
            userSelect: 'none',
            OUserSelect: 'none',
        };

        const homeLink = localStorage.getItem("homepage") === undefined ? "/homeSet" : "/home";
        const pages = [
            { key: homeLink, name: "Home", icon: "home" },
            { key: "/layouts", name: "Layouts", icon: "columns" },
            { key: "/variables", name: "Variables", icon: "sitemap" },
            { key: "/settings", name: "Settings", icon: "settings" },
            { key: "/about", name: "About", icon: "info" },
        ];

        var headerExt = "";
        if (window.location.pathname === "/home") {
            headerExt = " - " + TextFormatter.formatName(localStorage.getItem("homepage") || "");
        }
        else if (window.location.pathname === "/view") {
            headerExt = " - " + TextFormatter.formatName(new URLSearchParams(window.location.search).get("id") || "");
        }

        const header = (
            <>
                {loggedIn && <sui.Button style={sidebarBtn2} size="medium" circular icon="sidebar" onClick={_ => this.showSidebar()} />}
                {this.props.subHeader && <Header sub sidebar={sidebar} inverted={dark}>{this.props.subHeader}</Header>}
                {this.props.header && <Header sidebar={sidebar} inverted={dark}>{this.props.header + headerExt}</Header>}
            </>
        );

        return (
            <>
                <Helmet>
                    <title>
                        {this.state.setup.name || "closedHAB"}
                    </title>
                </Helmet>
                {loggedIn ?
                    <sui.Sidebar.Pushable style={pushable}>
                        <sui.Sidebar style={noSelect} width="thin" animation="slide out" inverted vertical visible={sidebar} as={sui.Menu}>
                            <sui.Button style={sidebarBtn1} size="small" circular icon="x" onClick={_ => this.hideSidebar()} />
                            <sui.Menu.Header>
                                <sui.Header inverted textAlign="center" style={{ marginTop: "12mm", marginBottom: "10px" }}>
                                    <sui.Image src={logo} size="massive" style={{ pointerEvents: 'none' }} />
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
                            <sui.Menu.Item onClick={_ => localStorage.removeItem("auth")} as={Link} to="/">
                                <sui.Icon name="log out" />
                                Log out
                            </sui.Menu.Item>
                        </sui.Sidebar>

                        <sui.Sidebar.Pusher style={root}>
                            <div style={screenPusher}>
                                {header}
                                {React.createElement(this.props.component, { dark: this.state.dark })}
                            </div>
                        </sui.Sidebar.Pusher>
                    </sui.Sidebar.Pushable>
                    :
                    <div style={screenSize}>
                        {header}
                        {this.props.children}
                    </div>
                }
            </>
        );
    }
}

export default reactWindowSize(UIComponent);
