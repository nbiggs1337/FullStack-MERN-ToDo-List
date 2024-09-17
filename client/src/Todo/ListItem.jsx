import React from 'react'

function ListItem({ data, handleEdit, handleDelete, key }) {


    return (
        <p key={key + data.title} href="#" class="list-group-item list-group-item-action active" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{data?.title}</h5>
                <small> Date : {data?.date}</small>
            </div>
            <p class="mb-1">{data?.text}</p>
            <div class="d-flex w-100 justify-content-between">
                <small>to do list ...</small>
                <button class='btn btn-primary' onClick={() => handleEdit(data)}>edit</button>
                <button class='btn btn-primary' onClick={() => handleDelete(data)}>delete</button>
            </div>

        </p>
    )
}

export default ListItem