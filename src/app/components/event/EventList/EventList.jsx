import React, { Component } from 'react'
import EventListItem from './EventListItem';
import { Card, Segment } from 'semantic-ui-react';

class EventList extends Component {
  render() {
    const { events, deleteEvent } = this.props;
    return (
      <Card.Group>
        { events && events.map((event) => (
          <EventListItem key={event.id} event={event} deleteEvent={deleteEvent} />
        ))}
      </Card.Group>
    )
  }
}

export default EventList;
