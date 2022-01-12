import React from 'react';
import * as sui from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class LinkList extends React.Component {
    render() {
        return (
            <sui.List bulleted relaxed animated size='big'>
                {this.props.items.map(item => (
                    <sui.List.Item active={item.active} style={{ marginTop: '10px' }} as={Link} to={item.link}>
                        {React.createElement(item.active ? 'b' : 'div', {}, item.elem)}
                    </sui.List.Item>
                ))}
            </sui.List>
        );
    }
}

export default LinkList;
