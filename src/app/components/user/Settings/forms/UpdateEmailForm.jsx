import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderTextInput } from '../../../../common/form/formComponents';
import { Header, Form, Message, Button, Divider, Segment } from 'semantic-ui-react';

const UpdateEmailForm = ({ pristine, error, invalid, submitting, handleSubmit, updateEmail }) => {
   return (
        <Segment>
            <Header color="teal" sub content="Change Email" />
            <p>Use this form to update your account email</p>
            { error && <Message basic pointing="below" color="red">{ error }</Message> }
            <Form onSubmit={handleSubmit(updateEmail)}>
                <Field width={8} name="email" type="text" pointing="left" inline={true} component={renderTextInput} placeholder="New Email" />
                <Divider />
                <Button disabled={ pristine || invalid || submitting} size="large" positive content="Update Email" />
            </Form>
        </Segment>
   )
};

export default reduxForm({form: 'accountEmail', enableReinitialize: true })(UpdateEmailForm);