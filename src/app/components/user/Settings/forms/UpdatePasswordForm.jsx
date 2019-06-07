import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderTextInput } from '../../../../common/form/formComponents';
import { Segment, Header, Form, Message, Button, Divider } from 'semantic-ui-react';
import { combineValidators, matchesField, isRequired, composeValidators } from 'revalidate';


const validate = combineValidators({
    newPassword1: isRequired({message: ' Please enter a password'}),
    newPassword2: composeValidators(
        isRequired({message: ' Please enter a password'}),
        matchesField('newPassword1')({message: 'Passwords do not match'})
    )()
});

const UpdatePasswordForm = ({ pristine, error, invalid, submitting, handleSubmit, updatePassword }) => {
    return (
    <Segment>
        <Header color="teal" sub content="Change Password" />
        <p>Use this form to update your account settings</p>
        { error && <Message basic pointing="below" color="red">{ error }</Message> }
        <Form onSubmit={handleSubmit(updatePassword)}>
            <Field width={8} name="newPassword1" type="password" pointing="left" inline={true} component={renderTextInput} placeholder="New Password" />
            <Field width={8} name="newPassword2" type="password" pointing="left" inline={true} component={renderTextInput} placeholder="Confirm Password" />
            <Divider />
            <Button disabled={ pristine || invalid || submitting} size="large" positive content="Update Password" />
        </Form> 
    </Segment>
   )
};

export default reduxForm({form: 'accountPassword', validate, enableReinitialize: true })(UpdatePasswordForm);