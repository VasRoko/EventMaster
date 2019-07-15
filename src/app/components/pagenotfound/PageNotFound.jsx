import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Header, Icon, } from 'semantic-ui-react';

const PageNotFound = ({history}) => (
    <Segment placeholder>
        <Header icon>
            <Icon name="search" />
            The page you are looking for can not be found.
        </Header>
        <Segment.Inline>
            404 - <Link to="/">Go Home</Link>
        </Segment.Inline>
    </Segment>
);

export default PageNotFound;
