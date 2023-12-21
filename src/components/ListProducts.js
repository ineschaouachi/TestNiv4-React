import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsFillTrashFill, BsFillPencilFill, BsPlusSquareFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function ListProducts() {

    const [columns, setColumns] = useState([])
    const [records, setRecords] = useState([])

    function handleClick(id) {

        const confirm = window.confirm('Do you want to delete this row')
        if (confirm) {
            axios.delete('http://localhost:8000/product/' + id)
                .then(res => {
                    toast.success("Data deleted successfully")
                    fetchProduct()
                }
                )

                .catch(err =>
                    toast.error("No deleted data"))

        }
    }

    const fetchProduct = () => {
        axios.get('http://localhost:8000/product')
            .then(res => {
                setColumns(Object.keys(res.data[0]))
                setRecords(res.data)
            })
    }

    useEffect(() => {
        fetchProduct()
    }, [])


    return (
        <div className='container mt-5'>
            <div className='text-end'>
                <Link to='/create' className='link link-primary'> <BsPlusSquareFill></BsPlusSquareFill></Link>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        {
                            columns.map((c, i) => (
                                <th key={i}><b>{c}</b></th>
                            ))
                        }
                        <th><b>Action</b></th>
                    </tr>

                </thead>
                <tbody>
                    {
                        records.map((d, i) =>
                            <tr key={i}>
                                <td>{d.id}</td>
                                <td>{d.name}</td>
                                <td>{d.description}</td>
                                <td>{d.price} DT</td>
                                <td>{d.quantity}</td>
                                <td>
                                    <span>
                                        <Link to={`/update/${d.id}`} className='link link-primary'>
                                            <BsFillPencilFill className=' link link-success' />
                                        </Link>
                                        <Link onClick={e => handleClick(d.id)} className='link link-danger'><BsFillTrashFill className='link link-danger' /></Link>

                                    </span>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

        </div>
    )

}


export default ListProducts