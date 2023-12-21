import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Formik } from 'formik';

const Register = () => {
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.firstName) {
                    errors.firstName = 'First name is required'
                }
                if (!values.lastName) {
                    errors.lastName = 'Last name is required'
                }
                if (!values.email) {
                    errors.email = 'Email is required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                if (!values.password) {
                    errors.password = 'Password is required'
                }
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    await axios.post('http://localhost:8000/user', values)
                    toast.success('Registred successfully!')
                    navigate('/login')
                } catch (error) {
                    toast.error('Failed :' + error.message)
                }
            }
            }
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                <div className='offset-lg-3 col-lg-6'>
                    <form className="container mt-5" onSubmit={handleSubmit}>
                        <div className="card">
                            <div className="card-header">
                                <h2>Create an account</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <div className='form-group'>
                                            <label className='mt-2'>First Name <span className='errmsg'>*</span></label>
                                            <input className="form-control mt-2"
                                                type="text"
                                                name="firstName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.firstName}
                                            />
                                            <div className='errmsg'>{errors.firstName && touched.firstName && errors.firstName}</div>
                                        </div>
                                        <div className='form-group'>
                                            <label className='mt-2'>Last Name <span className='errmsg'>*</span></label>
                                            <input className="form-control mt-2"
                                                type="text"
                                                name="lastName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.lastName}
                                            />
                                            <div className='errmsg'>{errors.lastName && touched.lastName && errors.lastName}</div>
                                        </div>
                                        <div className='form-group'>
                                            <label className='mt-2'>Email <span className='errmsg'>*</span></label>
                                            <input className="form-control mt-2"
                                                type="email"
                                                name="email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                            />
                                            <div className='errmsg'>{errors.email && touched.email && errors.email}</div>
                                        </div>
                                        <div className='form-group'>
                                            <label className='mt-2'>Password <span className='errmsg'>*</span></label>
                                            <input className="form-control mt-2"
                                                type="password"
                                                name="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                            <div className='errmsg'>{errors.password && touched.password && errors.password}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer text-muted">
                                <button type='submit' className='btn btn-success' disabled={isSubmitting}>Register</button>
                                <span className='m-5'>Do you have an account ? <Link className='text-primary m-1' to={'/login'}>Sign In</Link></span>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </Formik>
    )
}

export default Register