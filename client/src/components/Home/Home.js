import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import { getData, getTypes, alphabeticalOrder, attackOrder, originFilter, typesFilter, loadingFn, errorFn } from '../../redux/actions';
import style from './Home.module.css';

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [order, setOrder] = useState('');
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading);
    const types = useSelector(state => state.types);
    const data = useSelector(state => state.data);
    const last = currentPage * 12;
    const fist = last - 12;
    const currentData = data.slice(fist, last);
    const totalPages = Math.ceil(data.length/12);

    useEffect(()=>{
        dispatch(getData());
        dispatch(getTypes());
    }, [dispatch]);

    function loadingTime() {
        dispatch(loadingFn())
        window.setTimeout(() => {
            dispatch(errorFn())
        }, 1000);
    }
    
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

    function handleOrigin(e) {
        loadingTime();
        dispatch(originFilter(e.target.value));
        setOrder(e.target.value);
        setCurrentPage(1);
    };

    function handleOrder(e) {
        loadingTime();
        let value = e.target.value;
        if(value === 'A-Z' || value === 'Z-A') {
            dispatch(alphabeticalOrder(value));
            setOrder(value);
            setCurrentPage(1);
            console.log(order)
        } else {
            dispatch(attackOrder(value));
            setOrder(value);
            setCurrentPage(1);
        }
    };

    function handleTypes(e) {
        loadingTime();
        dispatch(typesFilter(e.target.value));
        setOrder(e.target.value);
        setCurrentPage(1);
    };

    return(
        <div className={style.container}>
            <nav>
                <SearchBar/>
            </nav>

            <aside>
                <div>
                    <Link className={style.link} to='/create'>
                        <h4>Create Pokemon</h4>
                    </Link>
                </div>
                <div className={style.selectContainer}>
                    <h4>Sort by:</h4>
                    <select onChange={e => handleOrder(e)}>
                        <option value={'A-Z'}>Alphabetical order A-Z</option>
                        <option value={'Z-A'}>Alphabetical order Z-A</option>
                        <option value={'MaxToMin'}>Attack major to minor</option>
                        <option value={'MinToMax'}>Attack minor to major</option>
                    </select>
                </div>
                <div>
                    <h4>Filter by origin:</h4>
                    <select onChange={e => handleOrigin(e)}>
                        <option value={'API'}>From API</option>
                        <option value={'DB'}>From DB</option>
                    </select>
                </div>
                <div>
                    <h4>Filter by types:</h4>
                    <select onChange={e => handleTypes(e)}>
                        <option value={'All'}>All types</option>
                        {types.length > 0 && 
                        types.map(e => (
                            <option key={e.id} value={e.name}>{e.name}</option>
                        ))}
                    </select>
                </div>
            </aside>

            <section>
                {currentData.length? (
                    currentData.map(e => {
                        return(
                            <article>
                                <Card
                                    key={e.id}
                                    id={e.id}
                                    name={e.name}
                                    image={e.image}
                                    types={e.types}
                                />
                            </article>
                        )
                    })
                    ) : (<h4 className={style.loading}>{loading}</h4>)
                }
            </section>

            <footer>
                {currentData.length? (
                    <div>
                        <button disabled={currentPage === 1? true : false} onClick={prevPage}>{'< Prev'}</button>
                        <p>{currentPage} of {totalPages}</p>
                        <button disabled={currentPage === totalPages? true : false} onClick={nextPage}>{'Next >'}</button>
                    </div>
                ) : (<p></p>)}
            </footer>
        </div>
    )
};

export default Home;