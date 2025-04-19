import '../App.css'
import { useNavigate } from 'react-router-dom';

function MemberCard({member}) {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/update_crewmate/${member.name}`);
    };

    return (
        <div className="member-card-container">      
            <a href={`/crewmates/${member.name}`} className="member-card">
                <h2>{member.name}</h2>
                <img src={member.fruit_image} alt={member.devil_fruit} />
                <p>Devil Fruit: {member.devil_fruit}</p>
                <p>Fruit Type: {member.fruit_type}</p>
                <p>Height: {member.height} cm</p>
            </a>  
            <button className="edit-crew-member" onClick={handleEdit}>Edit Crewmate</button>  
        </div>
    )
}

export default MemberCard
