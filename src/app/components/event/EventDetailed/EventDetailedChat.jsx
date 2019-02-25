import React from 'react'
import { Segment, Header, Comment, Button, Form } from 'semantic-ui-react';

const EventDetailedChat = () => {
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

                    <Comment>
                        <Comment.Avatar src="/assets/img/user.png"/>
                        <Comment.Content>
                            <Comment.Author as="a">Joe Henderson</Comment.Author>
                            <Comment.Metadata>
                                <div>1 Month ago</div>
                            </Comment.Metadata>
                            <Comment.Text>How artistic!</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                </Comment.Group>

                <Form reply>
                    <Form.TextArea />
                    <Button
                        content="Add Reply"
                        labelPosition="left"
                        icon="edit"
                        primary 
                    />
                </Form>
            </Segment>
        </div>
    )
}

export default EventDetailedChat;