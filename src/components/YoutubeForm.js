import React,  {useRef, useEffect} from 'react'
import {useFormik} from 'formik'

const initialValues = {
  name: '',
  email: '',
  channel: ''
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

  if (!values.channel) {
    errors.channel = 'Channel is required'
  }
  return errors
}

export const YoutubeForm = () => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validate: validate
  })

  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  // console.log('form values', formik.values)
  // console.log('form values', formik.errors)
  console.log('form values', formik.touched)
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' name='name' ref={inputRef} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
          {formik.touched.name && formik.errors.name? <div className='error'>{formik.errors.name}</div>:null}
        </div>
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input type='text' id='email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
          {formik.touched.email && formik.errors.email? <div className='error'>{formik.errors.email}</div>:null}
        </div>
        <div className='form-control'>
          <label htmlFor='channel'>Channel</label>
          <input type='text' id='channel' name='channel' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.channel}/>
          {formik.touched.channel && formik.errors.channel? <div className='error'>{formik.errors.channel}</div>:null}
        </div>
        <div><button type='submit'>Submit</button></div>
      </form>
    </div>
  )
}
