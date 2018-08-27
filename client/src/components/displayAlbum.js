import React from "react"

const DisplayAlbum = props =>{
 
    props.Albums.map(album =>{
    return <div>
        
        <h1>{props.title}</h1>
        <p>{props.artist}</p>
        <p>{props.released}</p>
        <button onClick={props.submitForm}>submit data</button>
    </div>
    })
}



export default DisplayAlbum