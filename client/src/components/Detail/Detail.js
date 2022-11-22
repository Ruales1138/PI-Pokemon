import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDataById, cleanDetail } from '../../redux/actions';
import style from './Detail.module.css'

function Detail(props) {
    const dispatch = useDispatch();
    const detail = useSelector(state => state.detail);
    const id = props.match.params.id;

    useEffect(()=>{
        dispatch(getDataById(id));
        return function () {
            dispatch(cleanDetail());
          };
    }, [dispatch, id]);

    return detail.name? (
        <div>
            <nav>
                <h1>Pokemon Details</h1>
            </nav>
            <div id={style.detailContainer}>
                <h1 className={style.detail}>{detail.name.charAt(0).toUpperCase() + detail.name.slice(1)}</h1>
                <img className={style.detail} src={detail.image} width='200' height="200" alt=''/>
                <h4 className={style.detail}>Id: {detail.id}</h4>
                <h4 className={style.detail}>Hp: {detail.hp}</h4>
                <h4 className={style.detail}>Attack: {detail.attack}</h4>
                <h4 className={style.detail}>Defense: {detail.defense}</h4>
                <h4 className={style.detail}>Speed: {detail.speed}</h4>
                <h4 className={style.detail}>Height: {detail.height}</h4>
                <h4 className={style.detail}>Weight: {detail.weight}</h4>
                <h4 className={style.detail}>Types: </h4>
                {detail.types.map(e => <h4 key={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</h4>)}
            </div>
        </div>
    ) : (<h4>Loading...</h4>)
};

export default Detail;