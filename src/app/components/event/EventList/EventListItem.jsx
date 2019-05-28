import React, { Component } from 'react'
import { Segment, Item, Icon, Button, List } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

class EventListItem extends Component {
  render() {
    const {event, deleteEvent} = this.props;
    return (
        <Segment.Group>
        <Segment>
            <Item.Group>
              <Item>
                <Item.Image as="a" size='tiny' circular src={event.hostPhotoURL} />
                <Item.Content>
                  <br/>
                  <Item.Header as={Link} to={`/event/${event.id}`}>{event.title}</Item.Header>
                  <Item.Meta>
                      Hosted by <Link to="#">{event.hostedBy}</Link>
                  </Item.Meta>
                </Item.Content>
              </Item>
            </Item.Group>
        </Segment> 
        <Segment>
          <span>
              <Icon name="clock" /> { format(event.date.toDate(), 'dddd Do MMMM')} at { format(event.date.toDate(), 'h:mm A')} |
              <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees && Object.values(event.attendees).map((attendee, index) => (
                <EventListAttendee key={index} attendee={attendee}/>
              ))}
          </List>
        </Segment>
        <Segment>
          <span>{event.description}</span>
        </Segment>
        <Segment clearing>
          <Button as={Link} to={`/event/${event.id}`} color="blue" floated="right" content="View" />
          <Button as="a" color="red" floated="right" onClick={deleteEvent(event.id)} content="Delete" />
        </Segment>
    </Segment.Group> 
    )
  }
}

export default EventListItem;
