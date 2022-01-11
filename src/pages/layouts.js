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
        return (
            <div style={{ marginLeft: '10%', marginTop: '10px' }}>
                <LinkList items={this.state.layouts.sort((a, b) => b - a).map(id => [
                    <>
                        <sui.Icon name={localStorage.getItem('homepage') === id ? 'home' : 'columns'} />
                        {TextFormatter.formatName(id)}
                    </>,
                    `/view?id=${id}`,
                ])} />
            </div>
        );
    }
}

export default LayoutsPage;
