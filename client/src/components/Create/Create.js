import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getNames, getTypes, create } from '../../redux/actions'

function Create() {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const types = useSelector(state => state.types)
    const names = useSelector(state => state.names);
    const allNames = names.map(e => e.name);
    const [selected, setSelected] = useState([]);
    const [errors, setErrors] = useState({});
    const [newItem, setNewItem] = useState({
        name: '',
        hp: '',
        attack: '',
		defense: '',
		speed: '',
		height: '',
		weight: ''
    });

    useEffect(() => {
        dispatch(getNames());
        dispatch(getTypes());
    }, [dispatch]);

    function validate(newItem) {
        let errors = {};

        if(!newItem.name) errors.name = 'Name is required'
        else if(!newItem.name.match(/^[A-Za-z]+$/)) errors.name = 'Name must contain only letters'
        else if(!newItem.name.match(/^[A-Z][a-z]+$/)) errors.name = 'Name must start with a capital letter'
        else if(allNames.includes(newItem.name.toLowerCase())) errors.name = 'Name already exists'

        if(!newItem.hp) errors.hp = 'The hp is required'
        else if(!newItem.hp.match(/^[0-9]+$/)) errors.hp = 'The hp has to be a number'
        else if(newItem.hp === '0') errors.hp = "The hp can't be 0"
        else if(parseFloat(newItem.hp) > 1000) errors.hp = 'The hp cannot be greater than 1000'

        if(!newItem.attack) errors.attack = 'The attack is required'
        else if(!newItem.attack.match(/^[0-9]+$/)) errors.attack = 'The attack has to be a number'
        else if(newItem.attack === '0') errors.attack = "The attack can't be 0"
        else if(parseFloat(newItem.attack) > 1000) errors.attack = 'The attack cannot be greater than 1000'

        if(!newItem.defense) errors.defense = 'The defense is required'
        else if(!newItem.defense.match(/^[0-9]+$/)) errors.defense = 'The defense has to be a number'
        else if(newItem.defense === '0') errors.defense = "The defense can't be 0"
        else if(parseFloat(newItem.defense) > 1000) errors.defense = 'The defense cannot be greater than 1000'

        if(!newItem.speed) errors.speed = 'The speed is required'
        else if(!newItem.speed.match(/^[0-9]+$/)) errors.speed = 'The speed has to be a number'
        else if(newItem.speed === '0') errors.speed = "The speed can't be 0"
        else if(parseFloat(newItem.speed) > 1000) errors.speed = 'The speed cannot be greater than 1000'

        if(!newItem.height) errors.height = 'The height is required'
        else if(!newItem.height.match(/^[0-9]+$/)) errors.height = 'The height has to be a number'
        else if(newItem.height === '0') errors.height = "The height can't be 0"
        else if(parseFloat(newItem.height) > 1000) errors.height = 'The height cannot be greater than 1000'

        if(!newItem.weight) errors.weight = 'The weight is required'
        else if(!newItem.weight.match(/^[0-9]+$/)) errors.weight = 'The weight has to be a number'
        else if(newItem.weight === '0') errors.weight = "The weight can't be 0"
        else if(parseFloat(newItem.weight) > 10000) errors.weight = 'The weight cannot be greater than 1000'

        return errors
    };

    function handleChange(e) {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value
        });

        setErrors(validate({
            ...newItem,
            [e.target.name]: e.target.value
        }));
    };

    function handleChangeSelected(e) {
        if(selected.length < 3) {
            setSelected([
                ...selected,
                parseFloat(e.target.value)
            ]);
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
        if(Object.entries(errors).length === 0 && newItem.name){
            let newData = {
                name: newItem.name,
                hp: newItem.hp,
                attack: newItem.attack,
                defense: newItem.defense,
                speed: newItem.speed,
                height: newItem.height,
                weight: newItem.weight,
                types: selected
            };
            dispatch(create(newData));
            setMessage('Data added successfully');
            setSelected([]);
            setNewItem({
                name: '',
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                height: '',
                weight: ''
            })
        } else setMessage('Failed to fill data')
    };

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <label>Name: </label>
            <input name='name' value={newItem.name} onChange={e => handleChange(e)}/>
            {errors.name && (<p>{errors.name}</p>)}

            <label>Hp: </label>
            <input name='hp' value={newItem.hp} onChange={e => handleChange(e)}/>
            {errors.hp && (<p>{errors.hp}</p>)}

            <label>Attack: </label>
            <input name='attack' value={newItem.attack} onChange={e => handleChange(e)}/>
            {errors.attack && (<p>{errors.attack}</p>)}

            <label>Defense: </label>
            <input name='defense' value={newItem.defense} onChange={e => handleChange(e)}/>
            {errors.defense && (<p>{errors.defense}</p>)}

            <label>Speed: </label>
            <input name='speed' value={newItem.speed} onChange={e => handleChange(e)}/>
            {errors.speed && (<p>{errors.speed}</p>)}

            <label>Height: </label>
            <input name='height' value={newItem.height} onChange={e => handleChange(e)}/>
            {errors.height && (<p>{errors.height}</p>)}

            <label>Weight: </label>
            <input name='weight' value={newItem.weight} onChange={e => handleChange(e)}/>
            {errors.weight && (<p>{errors.weight}</p>)}

            <label>Types: </label>
            <select onChange={e => handleChangeSelected(e)}>
                <option>All</option>
                {types.length > 0 &&
                    types.map(e => (
                        <option key={e.id} value={e.id}>{e.name}</option>
                    ))
                }
            </select>
            <p>{selected.length} added types</p>

            <button disabled={Object.entries(errors).length === 0 ? false : true} type="submit">Create</button>
            <p>{message}</p>
        </form>
    )
};

export default Create;