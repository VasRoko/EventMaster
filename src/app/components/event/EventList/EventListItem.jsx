import React, { Component, Fragment } from 'react'
import { Header, Label, Image, Dimmer, Grid, Icon, Button, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

class EventListItem extends Component {
  render() {
    const {event} = this.props;
    return (
      <Card>
        <Dimmer.Dimmable blurring>
          <Image 
              size='medium' 
              className="evenImage" 
              label={{ corner: 'left', color: event.cancelled ? 'red' : 'green',  }}
              src={event.hostPhotoURL || '/assets/img/events.jpg' } />
          <Dimmer active={true} onClickOutside={this.handleHide}>
            <Header size="large" style={{ textAlign: 'center', color: '#fff' }} as={Link} to={`/events/${event.id}`}>{event.title}</Header>
          </Dimmer>
        </Dimmer.Dimmable>
        <Card.Content>
        { event.cancelled && 
          <Fragment>
            <Label color='red' ribbon>
              This event has been cancelled
            </Label><hr />
          </Fragment> }
          <Grid>
              <Grid.Column width={6}>
                <Card.Meta>
                    Hosted by <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>
                </Card.Meta>
              </Grid.Column>
              <Grid.Column width={10}>
                <Icon name="clock" /> { event.date && format(event.date.toDate(), 'Do MMM')} at { format(event.date.toDate(), 'h:mm A')} 
              </Grid.Column>
          </Grid>
        </Card.Content>
        <Card.Content>
          <Card.Description>
              { event.description.slice(0, 45) + ( event.description.length > 45 ? " ..." : "") }
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="marker" /> {event.venue.slice(0, 30) + ( event.description.length > 30 ? " ..." : "")}
        </Card.Content>
        <Card.Content extra>
          <Button size="small" as={ Link } to={`/events/${event.id}`} color="blue" floated="right" content="View" />
        </Card.Content>
      </Card>
    )
  }
}

export default EventListItem;
