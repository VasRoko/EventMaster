import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid, Segment, Button } from 'semantic-ui-react';
import UserProfilePhotos from './UserProfilePhotos';
import UserProfileEvents from './UserProfileEvents';
import UserProfileAbout from './UserProfileAbout';
import UserProfileHeader from './UserProfileHeader';


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
        let filteredPhotos;

        if (photos) {
            filteredPhotos = photos.filter( photo => {
                return photo.url !== user.photoURL
            })
        }

        return (
            <Grid>
                <Grid.Column width={16}>
                    <UserProfileHeader user={user} />
                </Grid.Column>
                <Grid.Column width={12}>
                    <UserProfileAbout user={user}/>                   
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment attached>
                        <Button as={ Link } to="/settings/basic" icon="edit" positive fluid content="Edit Profile" />
                    </Segment>
                </Grid.Column>
                    {
                        filteredPhotos && filteredPhotos.length > 0 && 
                        <Grid.Column width={12}>
                            <UserProfilePhotos photos={filteredPhotos} />
                        </Grid.Column>
                    }
                <Grid.Column width={12}>
                    <UserProfileEvents />
                </Grid.Column>
            </Grid>
        )
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(auth => queryFirebase(auth))
)(UserProfilePage);
