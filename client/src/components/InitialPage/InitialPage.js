import React from "react";
import { Link } from "react-router-dom";
import pokemonLogo from '../../images/pokemonLogo.png';
import style from './InitialPage.module.css'

function InitialPage() {
    return(
        <div className={style.container}>
            <img src={pokemonLogo} height="200" alt=''/>
            <Link className={style.link} to='/pokemon'>Home</Link>
        </div>
    )
};

export default InitialPage;