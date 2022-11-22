import React from "react";
import { Link } from "react-router-dom";
import style from './Card.module.css';

function Card(props) {
    return(
        <div>
            <h1 className={style.card}>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</h1>
            <img className={style.card} src={props.image} width='200' height="200" alt=''/>
            <h4 className={style.card}>Types:</h4>
            {props.types.map(e => <h4 className={style.card} key={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</h4>)}
            <h4 className={style.card}>
                <Link className={style.link} to={`/pokemon/${props.id}`}>More info</Link>
            </h4>
        </div>
    )
};

export default Card;