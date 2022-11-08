import React from "react";

function Card(props) {
    return(
        <div>
            <h1>{props.name}</h1>
            <img src={props.image} width="300" height="200" alt=''/>
            <h4>Types:</h4>
            {props.types.map(e => <p>{e}</p>)}
        </div>
    )
};

export default Card;