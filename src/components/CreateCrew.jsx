import { useState } from 'react'
import '../App.css'
import { supabase } from '../client'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


function CreateCrew( {list} ) {
    const [name, setName] = useState('');
    const [fruitType, setFruitType] = useState('');
    const [height, setHeight] = useState('');

    const navigate = useNavigate();
    
    console.log(list) 

    if (!list) {
        return (
            <div className="loading">
              <h2>Fetching Devil Fruits...</h2>
              <img src="https://i.gifer.com/ZZ5H.gif" alt="loading" />
            </div>
        );
    }


    const createCrewMember = async (event) => {
    event.preventDefault();
  
    const filteredFruits = list.filter(fruit => fruit.type === fruitType);
    if (filteredFruits.length === 0) return alert("No fruit found for this type!");

    // Get a random fruit from filtered list
    const randomFruit = filteredFruits[Math.floor(Math.random() * filteredFruits.length)];

    await supabase
      .from('Crew members')
      .insert({
        name: name,
        fruit_type: fruitType,
        devil_fruit: randomFruit.roman_name,
        height: parseInt(height),
        fruit_image: randomFruit.filename.endsWith(".png") ? randomFruit.filename : "https://www.universalstudioshollywood.com/tridiondata/ush/en/us/files/images/ush-universal-fan-fest-nights-one-piece-jolly-roger-cf-b2.png",
        description: randomFruit.description,
      })
      .select()
      .then(({ data, error }) => {
        if (error) {
            console.error('Error inserting data:', error);
            alert('Error inserting data:', error.message);
        } else {
            console.log('Data inserted successfully:', data);
        }
        })
    setName('');
    setFruitType('');
    setHeight('');
  }


  return (
    <div className="create-crew-container">
        <button className="arrow-button" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
        </button>
        <h1>Create Your Crew</h1>
        <p>Use the form below to create your own crew of characters.</p>
        <form className="create-crew-form" onSubmit={createCrewMember}>
            <label htmlFor="crew-name">Name:</label>
            <input
                type="text"
                id="crew-name"
                name="crew-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <fieldset>
                <legend>Fruit Type:</legend>
                <label>
                <input
                    type="radio"
                    name="fruit-type"
                    value="Paramecia"
                    checked={fruitType === 'Paramecia'}
                    onChange={(e) => setFruitType(e.target.value)}
                />
                Paramecia
                </label>
                <label>
                <input
                    type="radio"
                    name="fruit-type"
                    value="Zoan"
                    checked={fruitType === 'Zoan'}
                    onChange={(e) => setFruitType(e.target.value)}
                />
                Zoan
                </label>
                <label>
                <input
                    type="radio"
                    name="fruit-type"
                    value="Logia"
                    checked={fruitType === 'Logia'}
                    onChange={(e) => setFruitType(e.target.value)}
                />
                Logia
                </label>
            </fieldset>

            <label htmlFor="height">Height (cm):</label>
            <input
                type="number"
                id="height"
                name="height"
                required
                value={height}
                onChange={(e) => setHeight(e.target.value)}
            />

            <button type="submit">Create Crew</button>
        </form>
    </div>
  )
}

export default CreateCrew
