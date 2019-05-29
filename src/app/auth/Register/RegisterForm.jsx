import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../common/form/TextInput';
import { Register } from '../../actions/authActions';

const actions = {
  Register
}

const RegisterForm = ({handleSubmit, Register}) => {
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(Register)}>
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

export default connect(null, actions)(reduxForm({form: 'registerForm'})(RegisterForm));
