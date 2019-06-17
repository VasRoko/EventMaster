import React from 'react'
import { Segment, List, Item, Label, Image } from 'semantic-ui-react';

const EventDetailedSidebar = ({ attendees }) => {
    return (
        <div>
            <Segment
                textAlign="center"
                style={{ border: 'none' }}
                attached="top"
                secondary
                inverted
                color="teal">
                {attendees && attendees.length} { attendees && attendees.length ===  1 ? 'Person' : 'People' } Going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    { attendees && Object.values(attendees).map((attendee) => 
                        <Item key={attendee.id} style={{ position: 'relative'}} >
                            <Label color="blue" ribbon="right" style={{ position: 'absolute'}}>
                                Host
                            </Label>
                            <Image size='tiny' circular src={ attendee.photoURL } />
                            <Item.Content>
                                <Item.Header as="h3" style={{ margin: '25px 0px', }}>
                                    <a href="/">{ attendee.displayName }</a>
                                </Item.Header>
                            </Item.Content>
                        </Item>
                    )} 
                </List>
            </Segment>
        </div>
    )
}

export default EventDetailedSidebar;