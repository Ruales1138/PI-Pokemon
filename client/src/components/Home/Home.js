import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import { getAllInfo } from '../../redux/actions/index'

function Home() {
    const dispatch = useDispatch();
    const info = useSelector(state => state.info);

    useEffect(()=>{
        dispatch(getAllInfo());
    }, [dispatch]);

    return(
        <div>
            <SearchBar/>
            {info.map(e => {
                return(
                    <Card
                        name={e.name}
                        image={e.image}
                        types={e.types}
                    />
                )
            })}
        </div>
    )
};

export default Home;