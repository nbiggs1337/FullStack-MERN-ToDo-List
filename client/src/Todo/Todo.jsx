import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useInput from '../Utilities/useInput'
import Task from './Task'


function Todo() {

    const [value, inputProps, resetInputs] = useInput()

    const [task, setTask] = useState([])

    const [update, setUpdate] = useState(null)

    const handleEdit = edit => setUpdate(edit)


    useEffect(() => {

        axios({
            method: "GET",
            url: 'http://localhost:8080/task'
        })
            .then(res => setTask(res.data))
            .catch(err => console.error(err))

        return () => { }
    }, [])



    const handleTask = (e) => {
        e.preventDefault()

        console.log("value", value)
        axios({
            method: 'POST',
            url: 'http://localhost:8080/newTask',
            data: value
        })
            .then(res => {
                console.log('res.data', res.data)
                setTask(prev => [...prev, res.data])
                resetInputs({})
            })
            .catch(err => console.error(err))

    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const { _id } = update

        axios({
            method: 'PUT',
            url: `http://localhost:8080/updateTask/${_id}`,
            data: value
        })
            .then(res =>  setTask((prev) => [...prev].map((item) => item._id === res.data._id ? res.data : item)))
            .catch(err => console.error(err))

        setUpdate(null)
        resetInputs({})
    }



    const handleDelete = remove => {
        const { _id } = remove

        axios({
            method: 'PUT',
            url: `http://localhost:8080/removeTask/${_id}`
        })
            .then((res) =>  setTask((prev) => [...prev].filter((item) => item._id !== res.data._id)))
            .catch((err) => console.error(err))
    }


    return (
        <>

            {/* {console.log(value)} */}
            {/* {console.log('Update', update)} */}


            <div className="container-md" style={{ maxWidth: "40vw", marginTop: "8vh" }}>

                <blockquote class="blockquote">

                    <h1>Todo List</h1>
                    <small>{task.length} : {task.length <= 1 ? "task" : "task's"}</small>

                </blockquote>

                <form onSubmit={(e) => { update ? handleUpdate(e) : handleTask(e) }}>

                    <div class="input-group mb-3">
                        <span
                            class="input-group-text"
                            id="inputGroup-sizing-default"
                        >
                            Title

                        </span>

                        <input
                            type="text"
                            {...inputProps}
                            value={value?.title || update?.title || ""}
                            name="title"
                            class="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" />
                    </div>

                    <div class="input-group mb-3">
                        <span
                            class="input-group-text"
                            id="inputGroup-sizing-default"
                        >
                            Description

                        </span>

                        <input
                            type="text"
                            {...inputProps}
                            value={value?.text || update?.text || ''}
                            name="text" class="form-control"
                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    </div>

                    <div class="input-group mb-3">
                        <span
                            class="input-group-text"
                            id="inputGroup-sizing-default"
                        >
                            Dead line

                        </span>

                        <input
                            type="date"
                            {...inputProps}
                            value={value?.date || update?.date || ''}
                            name="date"
                            class="form-control"
                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    </div>


                    <div class="input-group mb-3">

                        <button
                            class="form-control"
                            type='submit'
                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                        >
                            {update ? 'Update' : "Submit"}

                        </button>
                    </div>
                </form>

                <Task data={task} handleDelete={handleDelete} handleEdit={handleEdit} />

            </div>
        </>
    )
}

export default Todo