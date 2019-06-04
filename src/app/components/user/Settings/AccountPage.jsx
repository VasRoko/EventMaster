import React from 'react';
import { Segment, Header, Form, Message, Button, Divider, Icon } from 'semantic-ui-react';
import { combineValidators, matchesField, isRequired, composeValidators } from 'revalidate';
import { Field, reduxForm } from 'redux-form';
import { renderTextInput } from '../../../common/form/formComponents';

const validate = combineValidators({
    // newPassword1: isRequired({message: ' Please enter a password'}),
    newPassword2: composeValidators(
        // isRequired({message: ' Please enter a password'}),
        matchesField('newPassword1')({message: 'Passwords do not match'})
    )()
});

const AccountPage = ({error, invalid, submitting, handleSubmit, updatePassword, updateEmail, providerId }) => {
   return (
   <Segment>
       <Header dividing size="large" content="Account"/>
       {providerId && providerId === 'password' &&
        <div>
            <Header color="teal" sub content="Change Email" />
            <p>Use this form to update your account settings</p>
            { error && <Message basic pointing="below" color="red">{ error }</Message> }
            <Form onSubmit={handleSubmit(updateEmail)}>
                <Field width={8} name="email" type="text" pointing="left" inline={true} component={renderTextInput} placeholder="New Email" />
                <Divider />
                <Button disabled={invalid || submitting} size="large" positive content="Update Email" />
            </Form>
            <Header color="teal" sub content="Change Password" />
            <p>Use this form to update your account settings</p>
            { error && <Message basic pointing="below" color="red">{ error }</Message> }
            <Form onSubmit={handleSubmit(updatePassword)}>
                <Field width={8} name="newPassword1" type="password" pointing="left" inline={true} component={renderTextInput} placeholder="New Password" />
                <Field width={8} name="newPassword2" type="password" pointing="left" inline={true} component={renderTextInput} placeholder="Confirm Password" />
                <Divider />
                <Button disabled={invalid || submitting} size="large" positive content="Update Password" />
            </Form>
        </div>
       }
       {providerId && providerId === 'facebook.com' &&
       <div>
           <Header color="teal" sub content="Facebook Account" />
           <p>Please visit Facebook to update your account settings</p>
            <Button type="button" color="facebook">
                <Icon name="facebook" />Go to Facebook
            </Button>
       </div>
       }
       {providerId && providerId === 'google.com' &&
       <div>
           <Header color="teal" sub content="Google Plus Account" />
           <p>Please visit Facebook to update your account settings</p>
            <Button type="button" color="google plus">
                <Icon name="google plus" />Go to Google Plus
            </Button>
       </div>
       }
   </Segment>
   )
};

export default reduxForm({form: 'account', validate})(AccountPage);