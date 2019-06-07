import React from 'react';
import DatePicker from 'react-datepicker';
import { Form, Label, Select } from 'semantic-ui-react'
import 'react-datepicker/dist/react-datepicker.css';

export const renderRadio = ({input, label, type }) => {

    return (
      <Form.Field>
          <div className="ui radio checkbox">
                <input {...input} type={type}/>
                <label>{label}</label>
          </div>
      </Form.Field>
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

export const renderDateInput = ({ input: { value, onChange, onBlur }, width, placeholder, meta: {touched, error}, ...rest}) => {
    return (
      <Form.Field error={touched && !!error} width={width} > 
          <DatePicker 
              {...rest}
              placeholderText={placeholder}
              selected={
              value ? 
                (Object.prototype.toString.call(value)) !== '[object Date]' ? value.toDate() : value 
              : null }
              onChange={onChange}
              onBlur={(event, value) => onBlur(value)}
              onChangeRaw={(event) => event.preventDefault()}
          />
          {touched && error && <Label basic color='red' pointing>{error}</Label>}
      </Form.Field>
    )
  }
  

export const renderSelectInput = ({ input, placeholder, multiple, options, meta: { touched, error }}) => {
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
  