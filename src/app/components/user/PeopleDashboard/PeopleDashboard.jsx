import React from 'react';
import { Card, Segment, Header } from 'semantic-ui-react';
import PersonItem from './PersonItem';

const PeopleDashboard = () => (
    <div>
        <Segment>
            <Header>People Dashboard</Header>
        </Segment>
        <Card.Group itemsPerRow={8}>
            <PersonItem />
            <PersonItem />
        </Card.Group>
    </div>
);

export default PeopleDashboard;