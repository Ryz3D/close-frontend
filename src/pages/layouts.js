import React from 'react';
import { Link } from 'react-router-dom';
import * as sui from 'semantic-ui-react';
import Header from '../components/header';
import CloseRest from '../data/closeRest';

class LayoutsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layouts: [],
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

    transformName(s) {
        return s[0].toUpperCase() + s.substr(1);
    }

    render() {
        return (
            <div style={{ marginLeft: '10mm' }}>
                <sui.List bulleted relaxed animated size='large'>
                    {this.state.layouts.map(id => (
                        <>
                            <sui.List.Item as={Link} to={`/view?id=${id}`}>
                                {this.transformName(id)}
                            </sui.List.Item>
                        </>
                    ))}
                </sui.List>
            </div>
        );
    }
}

export default LayoutsPage;
