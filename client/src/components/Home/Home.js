import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import { getData } from '../../redux/actions'

function Home() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data);

    useEffect(()=>{
        dispatch(getData());
    }, [dispatch]);

    return(
        <div>
            <SearchBar/>
            {data.length? (
                data.map(e => {
                    return(
                        <Card
                            name={e.name}
                            image={e.image}
                            types={e.types}
                        />
                    )
                })
            ) : (<h4>Loading...</h4>)
            }
        </div>
    )
};

export default Home;