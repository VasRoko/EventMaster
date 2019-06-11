import React, { Component } from 'react';
import { Grid, Image, Segment, Item, Divider, Button, Header, Icon, List, Menu, Card } from 'semantic-ui-react';

class UserProfilePage extends Component {
    render() {
        return (
            <Grid>
                <Grid.Column width={16}>
                    <Segment attached>
                        <Item.Group>
                        <Item>
                            <Item.Image size='small' rounded src='/assets/img/user.png' />

                            <Item.Content>
                                <Item.Header as='a'>First Name</Item.Header>
                                {/* <Item.Meta>About Me</Item.Meta> */}
                                <Divider/>
                                <Item.Description>
                                    <p>Occupation: </p>
                                    <p>Age: </p>
                                    <p>Lives In: </p>

                                </Item.Description>
                            </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Segment attached>
                        <Grid columns={2}>
                            <Grid.Column width={10}>
                                <Header icon="user circle" content="About  Display Name" />
                                <Divider />
                                <p>I am a: <strong>placeholder</strong></p>
                                <p>Originally from: <strong>placeholder</strong></p>
                                <p>Member Since: <strong>placeholder</strong></p>
                                <p>Description: <strong>placeholder</strong></p>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Header icon="info circle" content="Interests" />
                                <Divider />
                                <List>
                                    <Item>
                                        <Icon name="book" />
                                        <Item.Content>Test</Item.Content>
                                    </Item>
                                </List>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment attached>
                        <Button icon="edit" positive fluid content="Edit Profile" />
                    </Segment>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Segment attached>
                        <Header icon="image" content="Photos"/>
                        <Image.Group size="small">
                            <Image src="https://randomuser.me/api/portraits/men/20.jpg" />
                            <Image src="https://randomuser.me/api/portraits/men/22.jpg" />
                            <Image src="https://randomuser.me/api/portraits/men/23.jpg" />
                            <Image src="https://randomuser.me/api/portraits/men/24.jpg" />
                            <Image src="https://randomuser.me/api/portraits/men/24.jpg" />
                        </Image.Group>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={12}>
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
                </Grid.Column>
            </Grid>
        )
    }
}

export default UserProfilePage;