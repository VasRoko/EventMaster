import React, { Component } from 'react'
import { Segment, Item, Icon, Button, List } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Link } from 'react-router-dom';

class EventListItem extends Component {
  render() {
    const {event, deleteEvent} = this.props;
    return (
        <Segment.Group>
        <Segment>
            <Item.Group>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header as="a">{event.title}</Item.Header>
                <Item.Description>
                    Hosted by <Link to="#">{event.hostedBy}</Link>
                </Item.Description>
              </Item.Content>
            </Item.Group>
        </Segment> 
        <Segment>
          <span>
              <Icon name="clock" /> {event.date} |
              <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees && event.attendees.map((attendee) => (
                <EventListAttendee key={attendee.id} attendee={attendee}/>
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          <Button as={Link} to={`/event/${event.id}`} color="blue" floated="right" content="View" />
          <Button as="a" color="red" floated="right" onClick={deleteEvent(event.id)} content="Delete" />
        </Segment>
    </Segment.Group> 
    )
  }
}

export default EventListItem;
