import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { Grid, Segment, Header } from 'semantic-ui-react';
import UserProfilePhotos from './UserProfilePhotos';
import UserProfileEvents from './UserProfileEvents';
import UserProfileAbout from './UserProfileAbout';
import UserProfileHeader from './UserProfileHeader';
import LoadingComponent from '../../loading/LoadingComponent';
import UserProfileAvatar from './UserProfileAvatar';
import { getUserEvents } from '../../../actions/userActions'

const actions = {
    getUserEvents
}


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
        events: state.events,
        eventsLoading: state.async.loading,
        auth: state.firebase.auth,
        photos: state.firestore.ordered.photos,
        requesting: state.firestore.status.requesting
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
    
    async componentDidMount() {
        let events = await this.props.getUserEvents(this.props.userId || this.props.auth.uid);
    }

    changeTab = (e, data) => {
        this.props.getUserEvents(this.props.userId || this.props.auth.uid, data.activeIndex );
    }
    
    render() {
        const { photos, profile, userId, requesting, events, eventsLoading } = this.props;
        let filteredPhotos;
        const loading = Object.values(requesting).some(a => a === true);

        if(loading) return <LoadingComponent />

        if (photos) {
            filteredPhotos = photos.filter( photo => {
                return photo.url !== profile.photoURL
            })
        }

        return (
            <Fragment>
                { !profile && <LoadingComponent content="Please wait ..." /> }
                 <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <UserProfileAvatar user={profile} userId={userId} />
                        </Grid.Column>
                        <Grid.Column width={12}>
                            { 
                                photos && photos.length > 1 ? <UserProfilePhotos photos={filteredPhotos} /> :
                                <Segment>
                                    <Header style={{ textAlign: 'center', margin: '10.5% 0px' }} as="h1" content="No photos to display" />
                                </Segment>
                            }
                            <UserProfileHeader user={profile} />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={4}>
                            <UserProfileAbout user={profile}/>                   
                        </Grid.Column>

                        <Grid.Column width={12}>
                            <UserProfileEvents changeTab={this.changeTab} events={events} eventsLoading={eventsLoading} />
                        </Grid.Column> 
                    </Grid.Row>
                </Grid>
            </Fragment>
        )
    }
}

export default compose(
    connect(mapStateToProps, actions),
    firestoreConnect((auth, userId) => queryFirebase(auth, userId))
)(UserProfilePage);
