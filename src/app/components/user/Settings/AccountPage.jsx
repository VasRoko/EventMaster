import React from 'react';
import { Segment, Header, Form, Label, Button, Divider, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../common/form/TextInput';

const AccountPage = ({error}) => {
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
                <Button size="large" positive content="Update Password" />
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

export default reduxForm({form: 'account'})(AccountPage);