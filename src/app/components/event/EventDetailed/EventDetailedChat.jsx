import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import distanceInWords from 'date-fns/distance_in_words'; 
import { Segment, Header, Comment, Button, Form } from 'semantic-ui-react';
import { renderTextArea } from '../../../common/form/formComponents';

class EventDetailedChat extends Component {
    hundleCommentSubmit = values => {
        const { addEventComment, eventId, reset } = this.props;
        addEventComment(eventId, values);
        reset();
    } 
    
    render() {
        const {eventChat} = this.props;
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
                                            <Comment.Action>Reply</Comment.Action>
                                        </Comment.Actions>
                                    </Comment.Content>
                                </Comment>
                            )
                        }
                    </Comment.Group>
    
                    <Form onSubmit={this.props.handleSubmit(this.hundleCommentSubmit)} reply>
                        <Field 
                            name='comment'
                            type='text'
                            component={renderTextArea}
                            rows={2}
                        />
                        <Button
                            content="Add Comment"
                            labelPosition="left"
                            icon="edit"
                            primary 
                        />
                    </Form>
                </Segment>
            </div>
        )
    }
}

export default reduxForm({ form: 'eventChat' })(EventDetailedChat);