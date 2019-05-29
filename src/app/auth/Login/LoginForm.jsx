import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Message } from 'semantic-ui-react';
import { combineValidators, isRequired } from 'revalidate';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../common/form/TextInput';
import { login } from '../../actions/authActions';

const actions = {
  login
}

const validate = combineValidators({
  email: isRequired('email'),
  password: isRequired('password'), 
});


const LoginForm = ({login, error, handleSubmit, submitting}) => {
  return (
    <Form size="large" loading={submitting} onSubmit={handleSubmit(login)}>
      { error &&
        <Message basic pointing="below" color="red">{ error }</Message>       
      }
      <Field type="text" name="email" component={TextInput} placeholder="Email Address"/>
      <Field type="password" name="password" component={TextInput} placeholder="Password"/>
      <Button fluid size="large" color="teal">Login</Button>
    </Form>
  )
}

export default connect(null, actions)(reduxForm({form: 'loginForm', validate})(LoginForm));
