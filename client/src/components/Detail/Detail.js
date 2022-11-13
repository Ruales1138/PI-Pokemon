import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDataById } from '../../redux/actions';

function Detail(id) {
    const dispatch = useDispatch();
    const detail = useSelector(state => state.detail);

    useEffect(()=>{
        dispatch(getDataById(1));
    }, [dispatch, id]);

    return(
        <div>
            <h1>{detail.name}</h1>
            <img src={detail.image} width="300" height="200" alt=''/>
            <ul>
                <li>Id: {detail.id}</li>
                <li>Hp: {detail.hp}</li>
                <li>Attack: {detail.attack}</li>
                <li>Defense: {detail.defense}</li>
                <li>Speed: {detail.speed}</li>
                <li>Height: {detail.height}</li>
                <li>Weight: {detail.weight}</li>
            </ul>
        </div>
    )
};

export default Detail;