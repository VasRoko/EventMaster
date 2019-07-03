import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import distanceInWords from 'date-fns/distance_in_words'; 
import { Segment, Header, Comment } from 'semantic-ui-react';
import EventCommentForm from './EventCommentForm';

class EventDetailedChat extends Component {

    state = {
        showReplyForm: false,
        selectedCommentId: null
    }
    

    handleOpenReplyForm = (id) => () => {
        this.setState({
            showReplyForm: true,
            selectedCommentId: id
        })
    }

    handleCloseReplyForm = () => {
        this.setState({
            selectedCommentId: null,
            showReplyForm: false
        })
    }
    
    render() {
        const { eventChat, eventId, addEventComment } = this.props;
        const { showReplyForm, selectedCommentId } = this.state;
        return (
            <div>
                <Segment 
                    textAlign="center"
                    attached="top"
                    inverted
                    color="teal"
                    style={{ border: 'none' }} >
                    <Header>Chat about this event</Header>
                </Segment>
                <Segment attached>
                    <Comment.Group>
                        {
                             eventChat && eventChat.map(comment => 
                                <Comment key={comment.id}>
                                    <Comment.Avatar src={ comment.photoURL || "/assets/img/user.png"}/>
                                    <Comment.Content>
                                        <Comment.Author as={Link} to={`/profile/${comment.uid}`}>{comment.displayName}</Comment.Author>
                                        <Comment.Metadata>
                                            <div>{ distanceInWords(comment.date, Date.now()) }</div>
                                        </Comment.Metadata>
                                        <Comment.Text>{ comment.text }</Comment.Text>
                                        <Comment.Actions>
                                            <Comment.Action onClick={this.handleOpenReplyForm(comment.id)}>Reply</Comment.Action>
                                            { showReplyForm && selectedCommentId === comment.id &&      
                                                <EventCommentForm 
                                                    closeForm={this.handleCloseReplyForm}
                                                    addEventComment={addEventComment}
                                                    form={`reply_${comment.id}`} 
                                                    eventId={eventId}
                                                    parentId={comment.id}
                                                    content="Reply"
                                                    />
                                            }
                                        </Comment.Actions>
                                    </Comment.Content>

                                    {/* Comment Reply */}
                                    <Comment.Group>
                                        { comment.childItems && comment.childItems.map(reply => 
                                            <Comment key={reply.id}>
                                                <Comment.Avatar src={ reply.photoURL || "/assets/img/user.png"}/>
                                                <Comment.Content>
                                                    <Comment.Author as={Link} to={`/profile/${reply.uid}`}>{reply.displayName}</Comment.Author>
                                                    <Comment.Metadata>
                                                        <div>{ distanceInWords(comment.date, Date.now()) }</div>
                                                    </Comment.Metadata>
                                                    <Comment.Text>{ reply.text }</Comment.Text>
                                                    <Comment.Actions>
                                                        <Comment.Action onClick={this.handleOpenReplyForm(reply.id)}>Reply</Comment.Action>
                                                        { showReplyForm && selectedCommentId === reply.id &&      
                                                            <EventCommentForm 
                                                                closeForm={this.handleCloseReplyForm}
                                                                addEventComment={addEventComment}
                                                                form={`reply_${reply.id}`} 
                                                                eventId={eventId}
                                                                parentId={reply.parentId}
                                                                content="Reply"
                                                                />
                                                        }
                                                    </Comment.Actions>
                                                </Comment.Content>
                                            </Comment>  
                                        )}
                                    </Comment.Group>
                                </Comment>
                            )
                        }
                    </Comment.Group>
    
                    <EventCommentForm 
                        parentId={0} 
                        eventId={eventId} 
                        form={`newComment`}
                        closeForm={this.handleCloseReplyForm} 
                        addEventComment={addEventComment} 
                    />
                </Segment>
            </div>
        )
    }
}

export default (EventDetailedChat);