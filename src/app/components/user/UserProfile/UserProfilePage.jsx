import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { Grid, Segment, Button } from 'semantic-ui-react';
import UserProfilePhotos from './UserProfilePhotos';
import UserProfileEvents from './UserProfileEvents';
import UserProfileAbout from './UserProfileAbout';
import UserProfileHeader from './UserProfileHeader';


const mapStateToProps = (state, ownProps) => {
    let userId = null;
    let profile = {};

    if(ownProps.match.params.id === state.firebase.auth.uid) {
        profile = state.firebase.profile
    } else {
        profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0]
        userId = ownProps.match.params.id
    }

    return {
        profile,
        userId,
        auth: state.firebase.auth,
        photos: state.firestore.ordered.photos
    }
}

const queryFirebase = ({ auth, userId }) => {
    if ( userId !== null) {
        return [
            {
                collection: 'users',
                doc: userId,
                storeAs: 'profile'
            }, 
            {
                collection: 'users',
                doc: userId,
                subcollections: [{ collection: 'photos' }],
                storeAs: 'photos'
            }
        ]
    } else {
        return [
            { 
                collection: 'users',
                doc: auth.uid,
                subcollections: [{ collection: 'photos' }],
                storeAs: 'photos'
            }
        ]
    }
} 



class UserProfilePage extends Component {
    render() {
        const { photos, profile } = this.props;
        console.log(profile)
        let filteredPhotos;

        if (photos) {
            filteredPhotos = photos.filter( photo => {
                return photo.url !== profile.photoURL
            })
        }

        return (
            <Grid>
                <Grid.Column width={16}>
                    <UserProfileHeader user={profile} />
                </Grid.Column>
                <Grid.Column width={12}>
                    <UserProfileAbout user={profile}/>                   
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
    firestoreConnect((auth, userId) => queryFirebase(auth, userId))
)(UserProfilePage);
