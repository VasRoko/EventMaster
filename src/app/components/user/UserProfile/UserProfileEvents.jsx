import React from 'react'
import { Segment, Header, Menu, Card, Image } from 'semantic-ui-react';


const UserProfileEvents = () => {
    return (
        <Segment attached>
            <Header icon="calendar alternate outline" content="Events"/>
            <Menu secondary pointing>
                <Menu.Item name="All Events" active />
                <Menu.Item name="Past Events" />
                <Menu.Item name="Future Events" />
                <Menu.Item name="Events Hosted" />
            </Menu>

            <Card.Group itemsPerRow={4} >
                <Card>
                    <Image src={'/assets/img/user.png'} />
                    <Card.Content>
                        <Card.Header textAlign="center">
                            <Header as="h3" style={{ padding: "10px" }}>Event title</Header>
                        </Card.Header>
                        <Card.Meta textAlign="center">
                            28th March 2018 at 10:00 PM
                        </Card.Meta>
                    </Card.Content>
                </Card>
            </Card.Group>
        </Segment>
    )
}

export default UserProfileEvents
