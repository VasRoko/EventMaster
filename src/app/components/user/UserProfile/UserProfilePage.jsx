import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { differenceInYears, format } from 'date-fns';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid, Image, Segment, Item, Divider, Button, Header, Icon, List, Menu, Card } from 'semantic-ui-react';


const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    user: state.firebase.profile,
    photos: state.firestore.ordered.photos
})
  
const queryFirebase = ({ auth }) => {
    return [
        { 
            collection: 'users',
            doc: auth.uid,
            subcollections: [{ collection: 'photos' }],
            storeAs: 'photos'
        }
    ]
} 

class UserProfilePage extends Component {
    render() {
        const { photos, user } = this.props;
        console.log(user)
        return (
            <Grid>
                <Grid.Column width={16}>
                    <Segment attached>
                        <Item.Group>
                        <Item>
                            <Item.Image size='small' rounded src={ user.photoURL || '/assets/img/user.png'} />
                            <Item.Content>
                                <Item.Header as='a'>{ user.displayName || 'Unknown Name' }</Item.Header>
                                {/* <Item.Meta>About Me</Item.Meta> */}
                                <Divider/>
                                <Item.Description>
                                    <p><strong>Occupation: </strong> { user.occupation || 'Unknown' }</p>
                                    <p><strong>Age: </strong>{ user.city ? differenceInYears(
                                        new Date(),
                                        new Date(user.dob.toDate())
                                    )  : 'Unknown age' }</p>
                                    <p><strong>Lives In: </strong>{ user.city || 'Unknown City' }</p>

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
                                <Header icon="user circle" content={`About ${user.displayName}`} />
                                <Divider />
                                <p>I am a: <strong> { user.gender || 'Unknown' } </strong></p>
                                <p>Originally from: <strong>{ user.origin || 'Unknown' }</strong></p>
                                <p>Member Since: <strong> { user.createdAt ? format(user.createdAt.toDate().toString(), 'MMM YYYY') : 'Unknown' } </strong></p>
                                <p>Description: <strong>{ user.about &&  user.about }</strong></p>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Header icon="info circle" content="Interests" />
                                <Divider />
                                <List>
                                    {
                                        user.interests ? user.interests.map((val, index ) => 
                                            <Item key={index}>
                                                <Icon name="caret right" />
                                                <Item.Content>{val.toUpperCase()}</Item.Content>
                                                <Divider />
                                            </Item>                                        
                                        ) : "No interests"
                                    }
                                </List>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment attached>
                        <Button as={ Link } to="/settings/basic" icon="edit" positive fluid content="Edit Profile" />
                    </Segment>
                </Grid.Column>
                {
                    photos && <Grid.Column width={12}>
                        <Segment attached>
                            <Header icon="image" content="Photos"/>
                            <Image.Group size="small">
                                { photos.map(photo =>
                                    <Image key={photo.id} src={photo.url} />
                                )}
                            </Image.Group>
                        </Segment>
                    </Grid.Column> 
                }

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

export default compose(
    connect(mapStateToProps),
    firestoreConnect(auth => queryFirebase(auth))
)(UserProfilePage);
