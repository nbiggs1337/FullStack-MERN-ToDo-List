import ListItem from './ListItem'
import Default from './Default'

function Task({data, handleEdit, handleDelete}) {

    return (
        <div class="list-group">

            {
                data.length
                    ?
                    data.map((item, i) => <ListItem data={item} key={i} handleDelete={handleDelete} handleEdit={handleEdit} />)
                    :
                    <Default />
            }

        </div>
    )
}

export default Task