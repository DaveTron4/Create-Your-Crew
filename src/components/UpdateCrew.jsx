import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../client';
import '../App.css'
import { FaArrowLeft } from 'react-icons/fa';

function UpdateCrew( {list} ) {
    const { name } = useParams();
    const navigate = useNavigate();

    const [crewMember, setCrewMember] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [fruitType, setFruitType] = useState('');
    const [height, setHeight] = useState('');

    useEffect(() => {
        const fetchMember = async () => {
          const { data, error } = await supabase
            .from('Crew members')
            .select()
            .eq('name', name)
            .single();
    
          if (data) {
            setCrewMember(data);
            setUpdatedName(data.name);
            setFruitType(data.fruit_type);
            setHeight(data.height);
          } else {
            console.error(error);
          }
        };
    
        fetchMember();
    }, [name]);

    const updateCrewMember = async (e) => {
        e.preventDefault();
    
        const filteredFruits = list.filter(fruit => fruit.type === fruitType);
        if (filteredFruits.length === 0) return alert("No fruit found for this type!");
    
        // Get a random fruit from filtered list
        const randomFruit = filteredFruits[Math.floor(Math.random() * filteredFruits.length)];

        await supabase
            .from('Crew members')
            .update({
                name: updatedName,
                devil_fruit: randomFruit.roman_name,
                fruit_image: randomFruit.filename.endsWith(".png") ? randomFruit.filename : "https://www.universalstudioshollywood.com/tridiondata/ush/en/us/files/images/ush-universal-fan-fest-nights-one-piece-jolly-roger-cf-b2.png",
                description: randomFruit.description,
                fruit_type: fruitType,
                height: parseInt(height)
            })
            .eq('id', crewMember.id);
    
            navigate("/crewmates");
      };

    const deleteCrew = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Crew members')
          .delete()
          .eq('id', crewMember.id); 
      
          navigate("/crewmates");
    }

  return (
    <div className="update-crew-container">
        <button className="arrow-button" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
        </button>
        <h1>Update Crewmate</h1>
        <p>Use the form below to update your crewmate's information.</p>  
        <form className="create-crew-form" onSubmit={updateCrewMember}>
            <label htmlFor="crew-name">Name:</label>
            <input
                type="text"
                required
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
            />

            <fieldset>
                <legend>Fruit Type:</legend>
                {['Paramecia', 'Zoan', 'Logia'].map(type => (
                    <label key={type}>
                      <input
                        type="radio"
                        value={type}
                        checked={fruitType === type}
                        onChange={(e) => setFruitType(e.target.value)}
                      />
                      {type}
                    </label>
                ))}
            </fieldset>

            <label>Height (cm):</label>
            <input
                type="number"
                required
                value={height}
                onChange={(e) => setHeight(e.target.value)}
            />

            <div className='update-buttons-container'>
                <button type="submit">Update Crew</button>
                <button className="delete-crew-member" onClick={deleteCrew}>Delete</button>  
            </div>
        </form> 
    </div>
  )
}

export default UpdateCrew
