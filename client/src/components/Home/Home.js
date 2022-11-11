import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import { getData } from '../../redux/actions'

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const data = useSelector(state => state.data);
    const last = currentPage * 12;
    const fist = last - 12;
    const currentData = data.slice(fist, last);
    const totalPages = Math.ceil(data.length/12);

    useEffect(()=>{
        dispatch(getData());
    }, [dispatch]);

    function scrollToTop() {
        window.scrollTo({
          top: 0, 
          behavior: 'auto'
        });
      };

    function nextPage() {
        setCurrentPage(currentPage + 1);
        scrollToTop();
    };

    function prevPage() {
        setCurrentPage(currentPage - 1);
        scrollToTop();
    };

    function handleOrder(e) {};

    return(
        <div>
            <SearchBar/>
            <div>
                <h4>Sort by:</h4>
                <select onChange={e => handleOrder(e)}>
                    <option value={'A-Z'}>Alphabetical order A-Z</option>
                    <option value={'Z-A'}>Alphabetical order Z-A</option>
                </select>
            </div>
            {currentData.length? (
                currentData.map(e => {
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
            {currentData.length? (
                <div>
                    <button disabled={currentPage === 1? true : false} onClick={prevPage}>{'< Prev'}</button>
                    <p>{currentPage} of {totalPages}</p>
                    <button disabled={currentPage === totalPages? true : false} onClick={nextPage}>{'Next >'}</button>
                </div>
            ) : (<p></p>)}
        </div>
    )
};

export default Home;