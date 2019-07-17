import React, { Component } from 'react'
import EventListItem from './EventListItem';
import { Card } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';

class EventList extends Component {
  render() {
    const { events, deleteEvent, getMoreEvents, loading, moreEvents } = this.props;
    return (
      <div>
        { events && events.length !== 0 && 
        <InfiniteScroll
          pageStart={0}
          loadMore={getMoreEvents}
          hasMore={!loading && moreEvents}
          initialLoad={false}
          >
          <Card.Group>
          { events && events.map((event) => (
            <EventListItem key={event.id} event={event} deleteEvent={deleteEvent} />
          ))  }
          </Card.Group>
        </InfiniteScroll>  }
        </div>
    )
  }
}

export default EventList;
