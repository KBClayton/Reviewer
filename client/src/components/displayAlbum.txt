import React from "react"

const AlbumNew = props =>{
   return <div>
        <h1>{props.title}</h1>
        <p>{props.artist}</p>
        <p>{props.released}</p>
        <button onClick={props.submitForm}>submit data</button>
    </div>
}



export default AlbumNew