import React, { useState, useEffect } from 'react'
import axios from 'axios'


const URL = 'http://192.168.0.15:5000/movements'

const Table = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        const response = await axios.get(URL)
        setEmployees(response.data)
    }

    const removeData = (id) => {

        axios.delete(`${URL}/${id}`).then(res => {
            const del = employees.filter(employee => id !== employee.id)
            setEmployees(del)
        })
    }

    const renderHeader = () => {
        let headerElement = ['id', 'importe', 'descripcion']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return employees && employees.map(({ id, importe, descripcion }) => {
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{importe}</td>
                    <td>{descripcion}</td>                   
                    <td className='accion'>
                            <i className="material-icons">autorenew</i>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
            <p className="flow-text">Movimientos</p>
            <table id='tabla_movimientos' className='highlight'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </>
    )
}


export default Table