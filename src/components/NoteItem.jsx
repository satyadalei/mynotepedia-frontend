import React from 'react'

const NoteItem = (props) => {

    return (
        <>
            <div className="card col-md-2 mx-1 my-2">
                <div className="card-body">
                    <h5 className="card-title">{props.note.title}</h5>
                    <p className="card-text">
                        {props.note.description}
                    </p>
                    <p style={{ textAlign: 'right' }}>
                        <i onClick={() => {props.launchDeletModal(props.note._id,props.note.title, props.note.description) }} style={{ cursor: 'pointer' }} className="fas fa-trash mx-2"></i>

                        <i onClick={() => { props.launchUpdtModal(props.note._id, props.note.title, props.note.description) }} style={{ cursor: 'pointer' }} className="far fa-edit mx-2"></i>
                    </p>
                </div>
            </div>
        </>
    )
}

export default NoteItem