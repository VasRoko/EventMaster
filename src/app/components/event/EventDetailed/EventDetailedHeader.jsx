import React from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import format from 'date-fns/format';

const imageStyle = {
    filter: 'brightness(30%)'
};

const imageTestStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white',
}; 

const EventDetailedHeader = ({event}) => {
    return (
        <Segment.Group>
            <Segment basic attached="top" style={{ padding: '0'}}>
                <Image src={`/assets/img/events.jpg`} fluid style={imageStyle}/>
                <Segment basic style={imageTestStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header 
                                    size="huge"
                                    content={event.title}
                                    style={{ color: 'white'}}
                                />
                                <p>{ format(event.date.toDate(), 'dddd Do MMMM')}</p>
                                <p>Hosted by<strong>{ event.hostedBy }</strong></p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>

            <Segment attached="bottom">
                <Button>Cancel My Place</Button>
                <Button color="teal">JOIN THIS EVENT</Button>
                <Button as={Link} to={`/manage/${event.id}`} color="orange" floated="right">
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group> 
    )
}

export default EventDetailedHeader;