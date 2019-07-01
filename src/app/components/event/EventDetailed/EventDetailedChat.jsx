import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import { Segment, Header, Comment, Button, Form } from 'semantic-ui-react';
import { renderTextArea } from '../../../common/form/formComponents';

class EventDetailedChat extends Component {
    hundleCommentSubmit = values => {
        const { addEventComment, eventId, reset } = this.props;
        addEventComment(eventId, values);
        reset();
    } 
    
    render() {
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
                        <Comment>
                            <Comment.Avatar src="/assets/img/user.png"/>
                            <Comment.Content>
                                <Comment.Author as="a">Matt</Comment.Author>
                                <Comment.Metadata>
                                    <div>Today at 5:42PM</div>
                                </Comment.Metadata>
                                <Comment.Text>How artistic!</Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action>Reply</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
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