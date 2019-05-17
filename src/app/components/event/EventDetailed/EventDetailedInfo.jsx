import React, { Component } from 'react'
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import EventDetailedMap from './EventDetailedMap';
import format from 'date-fns/format';

class EventDetailedInfo extends Component {
  state = {
      showMap: false
  }
  
  mapToggle = () => {
      console.log(this.state.showMap);
      this.setState(prevState => ({
        showMap: !prevState.showMap
      }))
  }
  
  render() {
    const { event } = this.props;
    return (
        <Segment.Group>
        <Segment attacehd="top">
            <Grid>
                <Grid.Column width={1}>
                    <Icon size="large" color="teal" name="info"/>
                </Grid.Column>
                <Grid.Column width={15}>
                    <p>{ event.description }</p>
                </Grid.Column>
            </Grid>
        </Segment>
        <Segment attached>
            <Grid verticalAlign="middle">
                <Grid.Column width={1}>
                    <Icon name="calendar alternate outline" size="large" color="teal" />
                </Grid.Column>
                <Grid.Column width={15}>
                    <span>{ format(event.date, 'dddd Do MMMM')} at { format(event.date, 'h:mm A')}</span>
                </Grid.Column>
            </Grid>
        </Segment>
        <Segment attached>
            <Grid verticalAlign="middle">
                <Grid.Column width={1}>
                    <Icon name="marker" size="large" color="teal" />
                </Grid.Column>
                <Grid.Column width={11}>
                    <span>{ event.venue }</span>
                </Grid.Column>
                <Grid.Column width={4} >
                    <Button color='teal' onClick={this.mapToggle}> { this.state.showMap ? "Close map" : "Show map"}</Button>
                </Grid.Column>
            </Grid>
        </Segment>
        <Segment  style={{ padding: 0 }} >
            {this.state.showMap && <EventDetailedMap lat={event.venueLatLng.lat} lng={event.venueLatLng.lng} />}
        </Segment>
    </Segment.Group>
    )
  }
}

export default EventDetailedInfo;