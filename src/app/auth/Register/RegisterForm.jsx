import React from 'react';
import { connect } from 'react-redux';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Button, Message, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../common/form/TextInput';
import { Register } from '../../actions/authActions';

const actions = {
  Register
}

const validate = combineValidators({
  displayName: isRequired('displayName'),
  email: isRequired('email'),
  password: isRequired('password'), 
});

const RegisterForm = ({handleSubmit, Register, error, invalid, submitting}) => {
  return (
    <div>
      <Form size="large" loading={submitting} onSubmit={handleSubmit(Register)}>
        { 
          error && 
          <Message basic color="red">
          <Icon name="warning" />{ error }</Message>       
        }
        <Field type="text" name="displayName" component={TextInput} placeholder="Your Name" />
        <Field type="email" name="email" component={TextInput} placeholder="Your Email" />
        <Field type="password" name="password" component={TextInput} placeholder="Your Password" />
        <Field type="password" name="" component={TextInput} placeholder="Confirm Password" />
        <Button disabled={invalid || submitting } fluid size="large" color="teal"> Register </Button>
      </Form>
    </div>
  )
}

export default connect(null, actions)(reduxForm({form: 'registerForm', validate})(RegisterForm));
