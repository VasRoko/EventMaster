import React from 'react';
import { Segment, Header, Form, Label, Button, Divider, Icon } from 'semantic-ui-react';
import { combineValidators, matchesField, isRequired, composeValidators } from 'revalidate';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../common/form/TextInput';

const validate = combineValidators({
    newPassword1: isRequired({message: ' Please enter a password'}),
    newPassword2: composeValidators(
        isRequired({message: ' Please enter a password'}),
        matchesField('newPassword1')({message: 'Passwords do not match'})
    )()
});

const AccountPage = ({error, invalid, submitting }) => {
   return (
   <Segment>
       <Header dividing size="large" content="Account"/>
       <div>
           <Header color="teal" sub content="Change Password" />
           <p>Use this form to update your account settings</p>
            <Form>
                <Field width={8} name="newPassword1" type="password" pointing="left" inline={true} component={TextInput} placeholder="New Password" />
                <Field width={8} name="newPassword2" type="password" pointing="left" inline={true} component={TextInput} placeholder="Confirm Password" />
                { error && (<Label basic color="red">{error}</Label> )}
                <Button disabled={invalid || submitting} size="large" positive content="Update Password" />
            </Form>
       </div>
       <Divider />
       <div>
           <Header color="teal" sub content="Facebook Account" />
           <p>Please visit Facebook to update your account settings</p>
            <Button type="button" color="facebook">
                <Icon name="facebook" />Go to Facebook
            </Button>
       </div>
       <Divider />
       <div>
           <Header color="teal" sub content="Google Plus Account" />
           <p>Please visit Facebook to update your account settings</p>
            <Button type="button" color="google plus">
                <Icon name="google plus" />Go to Google Plus
            </Button>
       </div>
   </Segment>
   )
};

export default reduxForm({form: 'account', validate})(AccountPage);