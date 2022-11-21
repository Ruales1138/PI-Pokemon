import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDataByName } from "../../redux/actions";
import style from './SearchBar.module.css';

function SearchBar() {
    const [name, setName] = useState('');
    const dispatch = useDispatch()

    function handleChange(e) {
        setName(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getDataByName(name.toLowerCase()))
        setName('');
    };

    return (
        <div id={style.container}>
            <form onSubmit={e => handleSubmit(e)}>
                <input value={name} onChange={e => handleChange(e)}/>
                <button id={style.search} type="submit">Search</button>
            </form>
        </div>
    )
};

export default SearchBar;