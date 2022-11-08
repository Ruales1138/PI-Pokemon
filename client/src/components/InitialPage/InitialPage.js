import React from "react";
import { Link } from "react-router-dom";
import pokemonLogo from '../../images/pokemonLogo.png'

function InitialPage() {
    return(
        <div>
            <img src={pokemonLogo} height="200" alt=''/>
            <Link to='/pokemon'>Home</Link>
        </div>
    )
};

export default InitialPage;