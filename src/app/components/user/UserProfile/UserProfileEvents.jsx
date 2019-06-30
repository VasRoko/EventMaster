import React from 'react'
import format from 'date-fns/format';
import {Link} from 'react-router-dom';
import { Segment, Header, Card, Image, Tab } from 'semantic-ui-react';

const panes = [
    {menuItem: 'All Events', pane: {key: 'allEvents'}},
    {menuItem: 'Past Events', pane: {key: 'pastEvents'}},
    {menuItem: 'Future Events', pane: {key: 'futureEvents'}},
    {menuItem: 'Hosted Events', pane: {key: 'hostedEvents'}}
]

const UserProfileEvents = ({eventsLoading, events, changeTab}) => {
    return (
        <Segment attached loading={eventsLoading}>
            <Header icon="calendar alternate outline" content="Events"/>
            <Tab onTabChange={(e, data) => changeTab(e, data)} panes={panes} menu={{ secondary: true, pointing: true}} />
            <br />
            <Card.Group itemsPerRow={4} >
                {
                    events ? events.map(event => 
                        <Card as={Link} to={`/events/${event.id}`} key={event.id}>
                            <Image src={event.hostPhotoUrl || '/assets/img/user.png'} />
                            <Card.Content>
                                <Card.Header textAlign="center">
                                    <Header as="h3" style={{ padding: "10px" }}>{ event.title }</Header>
                                </Card.Header>
                                <Card.Meta textAlign="center">
                                    <p>{ event.date && format(event.date.toDate(), 'dddd Do MMMM')}</p>
                                </Card.Meta>
                            </Card.Content>
                        </Card>       
                    ) : <p> No events to Display </p>
                }
            </Card.Group>
        </Segment>
    )
}

export default UserProfileEvents
