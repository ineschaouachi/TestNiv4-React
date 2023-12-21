import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
    const { id } = useParams();
    const [data, setData] = useState([])
    let dataToUpadate = data

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/product/' + id)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [id])
    return (
        <Formik
            initialValues={dataToUpadate || { name: '', description: '', price: '', quantity: '' }}
            validate={values => {
                const errors = {};
                if (!values.name) {
                    errors.name = 'Name is required'
                }
                if (!values.description) {
                    errors.description = 'Description is required'
                }
                if (!values.price) {
                    errors.price = 'Price is required';
                }

                if (!values.quantity) {
                    errors.quantity = 'Quantity is required'
                }
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(false);
                try {
                    axios.put('http://localhost:8000/product/' + id, values)
                        .then(res =>
                            toast.success("Data updated successfully"))
                    navigate('/products')
                } catch (error) {
                    toast.error("No updated data")
                }
            }
            }
            enableReinitialize
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
                                <h2>Edit product</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <div className='form-group'>
                                            <label className='mt-2'>Name <span className='errmsg'>*</span></label>
                                            <input className="form-control mt-2"
                                                type="text"
                                                name="name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                            />
                                            <div className='errmsg'>{errors.name && touched.name && errors.name}</div>
                                        </div>
                                        <div className='form-group'>
                                            <label className='mt-2'>Description <span className='errmsg'>*</span></label>
                                            <input className="form-control mt-2"
                                                type="text"
                                                name="description"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.description}
                                            />
                                            <div className='errmsg'>{errors.description && touched.description && errors.description}</div>
                                        </div>
                                        <div className='form-group'>
                                            <label className='mt-2'>Price <span className='errmsg'>*</span></label>
                                            <input className="form-control mt-2"
                                                type="text"
                                                name="price"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.price}
                                            />
                                            <div className='errmsg'>{errors.price && touched.price && errors.price}</div>
                                        </div>
                                        <div className='form-group'>
                                            <label className='mt-2'>Quantity <span className='errmsg'>*</span></label>
                                            <input className="form-control mt-2"
                                                type="text"
                                                name="quantity"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.quantity}
                                            />
                                            <div className='errmsg'>{errors.quantity && touched.quantity && errors.quantity}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer text-muted">
                                <button type='submit' className='btn btn-success' disabled={isSubmitting}>UPDATE</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </Formik>
    )
}

export default Edit