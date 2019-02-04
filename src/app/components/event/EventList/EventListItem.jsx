import React, { Component } from 'react'
import { Segment, Item, Icon, Button, List } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';

class EventListItem extends Component {
  render() {
    return (
        <Segment.Group>
        <Segment>
            <Item.Group>
              <Item.Image size="tiny" circular src="https://randomuser.me/api/portraits/women/11.jpg" />
              <Item.Content>
                <Item.Header as="a">Title</Item.Header>
                <Item.Description>
                    Hosted by <> hosted by</>
                </Item.Description>
              </Item.Content>
            </Item.Group>
        </Segment>
        <Segment>
          <span>
              <Icon name="clock" /> Time |
              <Icon name="marker" /> Date
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            <EventListAttendee />
            <EventListAttendee />
            <EventListAttendee />
          </List>
        </Segment>
        <Segment clearing>
          <span>Description Here</span>
          <Button as="a" color="blue" floated="right" content="View" />
        </Segment>
    </Segment.Group> 
    )
  }
}

export default EventListItem;
