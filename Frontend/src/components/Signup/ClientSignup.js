import React, { useEffect, useState } from 'react';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import './Signup.css';
import * as yup from 'yup';
import axios from 'axios';
import { Outlet, useLocation } from 'react-router-dom';

export default function Signup() {
  const location = useLocation();
  const [role, setRole] = useState('Customer');

  useEffect(() => {
    if (location.pathname.includes('restaurant-owner')) {
      setRole('Restaurant_Owner');
    } else if (location.pathname.includes('delivery-partner')) {
      setRole('Delivery');
    }
  }, [location]);

  const initialValues = {
    UserId: '20',
    Name: '',
    Email: '',
    PhoneNumber: '',
    Address: '',
    Password: '',
    Role: role
  };

  const validationSchema = yup.object({
    Name: yup.string().required('Required field.'),
    Email: yup.string().required('Required field.').email('Invalid format'),
    PhoneNumber: yup.string().required('Required field.'),
    Address: yup.string().required('Required field.'),
    Password: yup.string().required('Required field.')
  });

  const onSubmit = values => {
    axios.post('http://localhost:5283/api/User/Register', { ...values, Role: role })
      .then(res => {
        if (res.status === 200) {
          alert('User added successfully.');
          window.location.href='/login';
        }
      });
  };

  return (
    <div className='signup-div'>
      <div className='signup-container'>
        <h1>Signup</h1>
        <Formik className='formik-container'
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
          <Form className='signup-form-container'>
            {/* <div className='form-control'>
              <label htmlFor='UserId'>ID:</label>
              <Field type='text' name='UserId' />
              <ErrorMessage component='div' className='form-error' name='UserId'></ErrorMessage>
            </div> */}
            <div className='signup-input-row'>
              <div className='form-control'>
                <label htmlFor='Name'>Name:</label>
                <Field className='form-input-box' type='text' name='Name' />
                <ErrorMessage component='div' className='form-error' name='Name'></ErrorMessage>
              </div>
              <div className='form-control'>
                <label htmlFor='Email'>Email:</label>
                <Field className='form-input-box' type='text' name='Email' />
                <ErrorMessage component='div' className='form-error' name='Email'></ErrorMessage>
              </div>
            </div>
            <div className='signup-input-row'>
              <div className='form-control'>
                <label htmlFor='PhoneNumber'>Phone:</label>
                <Field className='form-input-box' type='text' name='PhoneNumber' />
                <ErrorMessage component='div' className='form-error' name='PhoneNumber'></ErrorMessage>
              </div>
              <div className='form-control'>
                <label htmlFor='Address'>Address:</label>
                <Field as='textarea' className='form-input-box' name='Address' /*rows="4" cols="50"*/ />
                <ErrorMessage component='div' className='form-error' name='Address'></ErrorMessage>
              </div>
            </div>
            <div className='signup-input-row'>
              <div className='form-control'>
                <label htmlFor='Password'>Password:</label>
                <Field className='form-input-box' type='password' name='Password' />
                <ErrorMessage component='div' className='form-error' name='Password'></ErrorMessage>
              </div>
              {/* <div className='form-control'>
                <label htmlFor='confirmpassword'>Confirm Password:</label>
                <Field className='form-input-box' type='password' name='confirmpassword' />
                <ErrorMessage component='div' className='form-error' name='confirmpassword'></ErrorMessage>
              </div> */}
            </div>
            {/* <div className='form-control'>
              <label htmlFor='Role'>Role:</label>
              <Field className='form-input-box' type='text' name='Role' />
              <ErrorMessage component='div' className='form-error' name='Role'></ErrorMessage>
            </div> */}
            <button type='submit'>Signup</button>
            <div className='account-creation'>
              <p>Already have an account? <span><a href='/login'>Log in</a></span></p>
            </div>
          </Form>
        </Formik>
      </div>
      <Outlet/>
    </div>
  )
}
