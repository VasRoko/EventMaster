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

                        <Label as='a' image color={ attendee.host && 'blue' }>
                            <Image  size='tiny' src={ attendee.photoURL || '/assets/img/user.png'} />
                            { attendee.displayName }
                            { attendee.host && <Label.Detail>Host</Label.Detail> }
                        </Label>                    
                    )} 
                </List>
            </Segment>
        </div>
    )
}

export default EventDetailedSidebar;