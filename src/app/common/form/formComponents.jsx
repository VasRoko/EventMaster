import React from 'react';
import DatePicker from 'react-datepicker';
import { Form, Label, Select } from 'semantic-ui-react'
import 'react-datepicker/dist/react-datepicker.css';

export const renderRadio = ({input, label}) => {
    return (
        <Form.Radio {...input} label={label} />
    )
}

export const renderTextInput = ({ input, width, type, placeholder, meta: { touched, error }}) => {
    return (
      <Form.Field error={touched && !!error } width={width}>
          <input { ...input} placeholder={placeholder} type={type} />
          {touched && error && <Label basic color='red' pointing>{error}</Label>}
      </Form.Field>
    )
}
  
export const renderTextArea = ({ input, width, rows, placeholder, meta: { touched, error } }) => {
    return (
        <Form.Field error={touched && !!error } width={width}>
            <textarea { ...input} placeholder={placeholder} rows={rows} />
            {touched && error && <Label basic color='red' pointing>{error}</Label>}
        </Form.Field>
    )
}

export const renderDateInput = ({ input: { value, onChange, ...restInput}, width, placeholder, meta: {touched, error}, ...rest}) => {
    return (
      <Form.Field error={touched && !!error} width={width}>
          <DatePicker 
              {...rest}
              placeholderText={placeholder}
              selected={value ? new Date(value) : null }
              onChange={onChange}
              {...restInput}
          />
          {touched && error && <Label basic color='red' pointing>{error}</Label>}
      </Form.Field>
    )
  }
  

export const renderSelectInput = ({ input, type, placeholder, multiple, options, meta: { touched, error }}) => {
    return (
      <Form.Field error={ touched && !!error }>
          <Select 
              value={input.value || null}
              onChange={(e, data) => input.onChange(data.value)}
              placeholder={placeholder}
              options={options}
              multiple={multiple}
          />
          {touched && error && <Label basic color='red' pointing>{error}</Label>}
      </Form.Field>
    )
  }
  