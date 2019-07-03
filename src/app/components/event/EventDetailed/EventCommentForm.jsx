import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderTextArea } from '../../../common/form/formComponents';
import { Button, Form } from 'semantic-ui-react';

class EventCommentForm extends Component {

    hundleCommentSubmit = values => {
        const { addEventComment, eventId, reset, closeForm, parentId } = this.props;
        addEventComment(eventId, values, parentId);
        reset();
        if(parentId !== 0) {
            closeForm();
        }
    }

    render() {
        const { content, parentId } = this.props;
        return (
            <Form onSubmit={this.props.handleSubmit(this.hundleCommentSubmit)} reply>
                <Field name='comment' type='text' component={renderTextArea} rows={0} />
                <Button content={content || "Add Comment"} labelPosition="left" icon="edit" color="teal" />
            </Form> 
        )   
    }
}

export default reduxForm({ Fields:  'comment' })(EventCommentForm);