import React from "react";

function Card(props) {
    return(
        <div>
            <h1>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</h1>
            <img src={props.image} width="300" height="200" alt='image'/>
            <h4>Types:</h4>
            {props.types.map(e => <h4>{e.charAt(0).toUpperCase() + e.slice(1)}</h4>)}
            <hr/>
        </div>
    )
};

export default Card;