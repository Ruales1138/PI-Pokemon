import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDataById } from '../../redux/actions';

function Detail(props) {
    const dispatch = useDispatch();
    const detail = useSelector(state => state.detail);
    const id = props.match.params.id;

    useEffect(()=>{
        dispatch(getDataById(id));
    }, [dispatch, id]);

    return detail.name? (
        <div>
            <h1>{detail.name.charAt(0).toUpperCase() + detail.name.slice(1)}</h1>
            <img src={detail.image} width="300" height="200" alt=''/>
            <ul>
                <li>Id: {detail.id}</li>
                <li>Hp: {detail.hp}</li>
                <li>Attack: {detail.attack}</li>
                <li>Defense: {detail.defense}</li>
                <li>Speed: {detail.speed}</li>
                <li>Height: {detail.height}</li>
                <li>Weight: {detail.weight}</li>
                <li>Types: </li>
                {detail.types.map(e => <p key={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</p>)}
            </ul>
        </div>
    ) : (<h4>Loading...</h4>)
};

export default Detail;