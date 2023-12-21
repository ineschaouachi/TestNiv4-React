import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Formik } from 'formik';


function Login() {

    const navigate = useNavigate();
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {};
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
                const response = await axios.get('http://localhost:8000/user')
                const connectedUser = response.data.find((obj) =>
                    obj.email === values.email && obj.password === values.password

                )
                if (connectedUser) {
                    navigate('/')
                    toast.success("Welcome " + connectedUser.firstName)
                }
                else {
                    toast.warning("Please verify your email and password")
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
                                <h2>Sign In</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">

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
                                <button type='submit' className='btn btn-success' disabled={isSubmitting}>Log In</button>
                                <span className='m-5'>Create an account ? <Link className='text-primary m-1' to={'/register'}>Sign Up</Link></span>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </Formik>
    )
}

export default Login