import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css'
import { supabase } from '../client';


function CrewmateInfo() {
    const { name } = useParams();
    const [crewMember, setCrewMember] = useState(null);

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/update_crewmate/${name}`);
    };

    useEffect(() => {
        const fetchMember = async () => {
            const { data, error } = await supabase
            .from('Crew members')
            .select()
            .eq('name', name)
            .single();
    
            if (data) {
                setCrewMember(data);
            } else {
                console.error(error);
            }
        };
    
        fetchMember();
    }, [name]);

    return (
        <div className="crewmate-info-container">
            <h1>{name}'s Info</h1>
            {crewMember ? (
                <div className="crewmate-details">
                    <img src={crewMember.fruit_image} alt={crewMember.devil_fruit} />
                    <h2>{crewMember.name}</h2>
                    <p>Devil Fruit: {crewMember.devil_fruit}</p>
                    <p>Fruit Type: {crewMember.fruit_type}</p>
                    <p>Devil Fruit Desciption: {crewMember.description}</p>
                    <p>Height: {crewMember.height} cm</p>
                    <p>Date Added: {crewMember.created_at}</p>
                </div>
            ) : (
                <div className="loading">
                    <h2>Loading...</h2>
                    <img src="https://i.gifer.com/ZZ5H.gif" alt="loading" />
                </div>
            )}
            <button className="edit-crew-member" onClick={handleEdit}>Edit Crewmate</button>  
            <div className="back-button">
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
  )
}

export default CrewmateInfo
