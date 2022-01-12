import React from 'react';
import * as sui from 'semantic-ui-react';
import LinkList from '../components/linkList';
import CloseRest from '../data/closeRest';
import TextFormatter from '../data/textFormatter';

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

    render() {
        const home = localStorage.getItem("homepage");

        return (
            <div style={{ marginLeft: '10%', marginTop: '10px' }}>
                <LinkList items={this.state.layouts.sort().map(id => ({
                    elem: <>
                        <sui.Icon name={home === id ? 'home' : 'columns'} style={{ marginRight: '5px' }} />
                        {TextFormatter.formatName(id)}
                    </>,
                    link: `/view?id=${id}`,
                    active: home === id,
                }))} />
            </div>
        );
    }
}

export default LayoutsPage;
