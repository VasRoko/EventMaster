import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { Grid, Segment, Header, Container } from 'semantic-ui-react';
import UserProfilePhotos from './UserProfilePhotos';
import UserProfileEvents from './UserProfileEvents';
import UserProfileAbout from './UserProfileAbout';
import UserProfileHeader from './UserProfileHeader';
import LoadingComponent from '../../loading/LoadingComponent';
import UserProfileAvatar from './UserProfileAvatar';
import { getUserEvents, followUser, unfollowUser } from '../../../actions/userActions'
import PageNotFound from '../../pagenotfound/PageNotFound';

const actions = {
    getUserEvents,
    followUser,
    unfollowUser
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
        events: state.events.userEvents,
        eventsLoading: state.async.loading,
        auth: state.firebase.auth,
        photos: state.firestore.ordered.photos,
        followers: state.firestore.ordered.followers,
        following: state.firestore.ordered.following,
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
            }, 
            {
                collection: 'users',
                doc: userId,
                subcollections: [{ collection: 'followers' }],
                storeAs: 'followers'
            }, 
            {
                collection: 'users',
                doc: auth.uid,
                subcollections: [{ collection: 'following' }],
                storeAs: 'following'
            }
        ]
    } else {
        return [
            { 
                collection: 'users',
                doc: auth.uid,
                subcollections: [{ collection: 'photos' }],
                storeAs: 'photos'
            }, 
            {
                collection: 'users',
                doc: auth.uid,
                subcollections: [{ collection: 'followers' }],
                storeAs: 'followers'
            }, 
            {
                collection: 'users',
                doc: auth.uid,
                subcollections: [{ collection: 'following' }],
                storeAs: 'following'
            }
        ]
    }
} 

class UserProfilePage extends Component {
    
    async componentDidMount() {
        await this.props.getUserEvents(this.props.userId || this.props.auth.uid);
    }

    changeTab = (e, data) => {
        this.props.getUserEvents(this.props.userId || this.props.auth.uid, data.activeIndex );
    }
    
    handleFollowUser = (userId) => {
        this.props.followUser(userId);
    }

    handleUnFollowUser = (followerId, followerDocId, followeeDocId) => {
        this.props.unfollowUser(followerId, followerDocId, followeeDocId);
    }
    
    render() {
        const { photos, profile, userId, requesting, events, followers, following, eventsLoading } = this.props;
        let filteredPhotos;
        let filteredFollowing;
        let isFollowing;

        const loading = Object.values(requesting).some(a => a === true);

        if(loading) return <LoadingComponent />

        if (photos) {
            filteredPhotos = photos.filter( photo => {
                return photo.url !== profile.photoURL
            })
        }

        if(followers) {
            isFollowing = followers.filter(follower => {
                return follower.uid === this.props.auth.uid;
            })
        }

        if(following)  {
            filteredFollowing = following.filter(followee => {
                return followee.uid === userId;
            })
        }
        
        return (
            <div>
                {
                    profile ? 
                        <Container>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={4}>
                                        <UserProfileAvatar 
                                            isFollowing={isFollowing} 
                                            following={filteredFollowing} 
                                            followers={followers} 
                                            unfollowUser={this.handleUnFollowUser} 
                                            followUser={this.handleFollowUser} 
                                            user={profile} 
                                            userId={userId} />
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
                        </Container> 
                    : <PageNotFound />
                }
            </div>
        )
    }
}

export default compose(
    connect(mapStateToProps, actions),
    firestoreConnect((auth, userId) => queryFirebase(auth, userId))
)(UserProfilePage);
