import React from 'react';
import * as sui from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class LinkList extends React.Component {
    render() {
        return (
            <sui.List bulleted relaxed animated size='big'>
                {this.props.items.map(item => (
                    <sui.List.Item as={Link} to={item[1]}>
                        {item[0]}
                    </sui.List.Item>
                ))}
            </sui.List>
        );
    }
}

export default LinkList;
