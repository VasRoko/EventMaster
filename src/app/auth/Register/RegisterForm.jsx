import React from 'react';
import { connect } from 'react-redux';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Button, Message, Icon, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { renderTextInput } from '../../common/form/formComponents';
import { Register } from '../../actions/authActions';
import SocialLogin from '../SocialLogin/SocialLogin';

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
        <Field type="text" name="displayName" component={renderTextInput} placeholder="Your Name" />
        <Field type="email" name="email" component={renderTextInput} placeholder="Your Email" />
        <Field type="password" name="password" component={renderTextInput} placeholder="Your Password" />
        <Field type="password" name="" component={renderTextInput} placeholder="Confirm Password" />
        <Button disabled={invalid || submitting } fluid size="large" color="teal"> Register </Button>
        <Divider horizontal> Or </Divider>
        <SocialLogin />
      </Form>
    </div>
  )
}

export default connect(null, actions)(reduxForm({form: 'registerForm', validate})(RegisterForm));
