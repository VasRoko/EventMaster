import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Label, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../common/form/TextInput';
import { login } from '../../actions/authActions';

const actions = {
  login
}

const LoginForm = ({login, error, handleSubmit}) => {
  return (
    <Form size="large" onSubmit={handleSubmit(login)}>
      {  error &&
        <Label basic pointing="below" color="red">               
          <Icon name="warning sign"/> { error }
        </Label>       
      }
      <Field type="text" name="email" component={TextInput} placeholder="Email Address"/>
      <Field type="password" name="password" component={TextInput} placeholder="Password"/>
      <Button fluid size="large" color="teal">Login</Button>
    </Form>
  )
}

export default connect(null, actions)(reduxForm({form: 'loginForm'})(LoginForm));
