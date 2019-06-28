import React, { Component } from 'react'
import EventListItem from './EventListItem';
import { Card } from 'semantic-ui-react';
// import InfiniteScroll from 'react-infinite-scroller';

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
