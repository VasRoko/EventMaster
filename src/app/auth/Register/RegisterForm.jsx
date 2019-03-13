import React from 'react'
import { Form, Segment, Button } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../common/form/TextInput';

const RegisterForm = () => {
  return (
    <div>
      <Form size="large">
        <Segment>
            <Field type="text" name="nickname" component={TextInput} placeholder="Your Nickname" />
            <Field type="email" name="email" component={TextInput} placeholder="Your Email" />
            <Field type="password" name="password" component={TextInput} placeholder="Your Password" />
            <Field type="password" name="" component={TextInput} placeholder="Confirm Password" />
            <Button fluid size="large" color="teal"> Register </Button>
        </Segment>
      </Form>
    </div>
  )
}

export default reduxForm({form: 'registerForm'})(RegisterForm);
