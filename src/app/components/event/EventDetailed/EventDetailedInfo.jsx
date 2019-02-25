import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react';

const EventDetailedInfo = ({ event }) => {
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
                        <span>{ event.date }</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign="middle">
                    <Grid.Column width={1}>
                        <Icon name="marker" size="large" color="teal" />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>{ event.venue }</span>
                    </Grid.Column>
                </Grid>
            </Segment>

        </Segment.Group>

    )
}

export default EventDetailedInfo;