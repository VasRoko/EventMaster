import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Card, Segment, Header } from 'semantic-ui-react';
import PersonItem from './PersonItem';

const mapStateToProps = (state) => {   
    return {
        auth: state.firebase.auth,
        followers: state.firestore.ordered.followers,
        following: state.firestore.ordered.following,
    }
}


const queryFirebase = ({ auth }) => {
        return [
            {
                collection: 'users',
                doc: auth.uid,
                storeAs: 'userProfile'
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

class PeopleDashboard extends Component {

    render() { 
        const{ followers, following } = this.props;

        return (
            <div>
                <Segment>
                    {
                        followers && <Header>{followers.length }{ followers.length === 1 ? <span> person are following you!</span> : <span> people are following you!</span>} </Header>
                    }
                </Segment>
                <Card.Group itemsPerRow={8}>
                    {
                        followers && followers.length > 0 && followers.map(user =>                          
                            <PersonItem key={user.uid} user={user}  />
                        )
                    }
                </Card.Group>
                
                <Segment>
                    {
                         following && <Header> You are following {following.length}{ following.length === 1 ? <span> person!</span> : <span> people!</span>   } </Header>
                    }
                </Segment>
                <Card.Group itemsPerRow={8}>
                    {
                        following && following.length > 0 && following.map(user =>                          
                            <PersonItem key={user.uid} user={user}  />
                        )
                    }
                </Card.Group>
            </div>
        )
    }
}

export default compose(
    connect(mapStateToProps, null),
    firestoreConnect((auth) => queryFirebase(auth))
)(PeopleDashboard);