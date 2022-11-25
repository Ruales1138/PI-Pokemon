import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDataByName, loadingFn, errorFn  } from "../../redux/actions";
import style from './SearchBar.module.css';

function SearchBar() {
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    function loadingTime() {
        dispatch(loadingFn())
        window.setTimeout(() => {
            dispatch(errorFn())
        }, 1000);
    }

    function handleChange(e) {
        setName(e.target.value);
    };

    function handleSubmit(e) {
        loadingTime();
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