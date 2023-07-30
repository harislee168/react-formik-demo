import React from 'react'
import {Formik, Form, Field, ErrorMessage, FieldArray} from 'formik'
import TextError from './TextError'

const initialValues = {
  name: '',
  email: '',
  comments: '',
  social: {
    facebook: '',
    twitter: ''
  },
  phoneNumbers: ['', ''],
  phNumbers: ['']
}

const onSubmit = (values) => {
  console.log(values)
}

const validate = (values) => {
  let errors = {}
  if (!values.name) {
    errors.name = 'Name is required'
  }

  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Invalid email format'
  }
  return errors
}

export const YoutubeForm = () => {

  // console.log('form values', formik.values)
  // console.log('form values', formik.errors)
  // console.log('form values', formik.touched)
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
      <Form>
        <div className='form-control'>
          <label htmlFor='name'>Name</label>
          <Field type='text' id='name' name='name' />
          <ErrorMessage name='name'component={TextError} />
        </div>
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <Field type='text' id='email' name='email' />
          <ErrorMessage name='email'>
            {(errorMessage) => {return <div className='error'>{errorMessage}</div>}}
          </ErrorMessage>
        </div>
        <div className='form-control'>
          <label htmlFor='comments'>Comments</label>
          <Field as='textarea' id='comments' name='comments' />
        </div>
        <div className='form-control'>
          <label htmlFor='facebook'>Facebook</label>
          <Field type='text' id='facebook' name='social.facebook' />
        </div>
        <div className='form-control'>
          <label htmlFor='twitter'>Twitter</label>
          <Field type='text' id='twitter' name='social.twitter' />
        </div>
        <div className='form-control'>
          <label htmlFor='primaryPh'>Primary phone</label>
          <Field type='text' id='primaryPh' name='phoneNumbers[0]' />
        </div>
        <div className='form-control'>
          <label htmlFor='secondaryPh'>Primary phone</label>
          <Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
        </div>
        <div className='form-control'>
          <label>List of phone numbers</label>
          <FieldArray name='phNumbers'>
            {
              (fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps
                const { values } = form
                const { phNumbers } = values
                console.log('fieldArrayProps', fieldArrayProps)
                return (
                  <div>
                    {
                      phNumbers.map((phNumber, index) =>
                        {return <div key={index}>
                          <Field name={`phNumbers[${index}]`}></Field>
                          {index > 0 && <button type='button' onClick={() => remove(index)}> - </button>}
                          <button type='button' onClick={() => push('')}> + </button>
                        </div>}
                      )
                    }
                  </div>
                )
              }
            }
          </FieldArray>
        </div>
        <div><button type='submit'>Submit</button></div>
      </Form>
    </Formik>
  )
}
