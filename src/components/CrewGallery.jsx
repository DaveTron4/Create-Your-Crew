import { useState, useEffect } from 'react'
import '../App.css'
import { supabase } from '../client'
import MemberCard from './MemberCard.jsx'

function CrewGallery() {
    const [crewMembers, setCrewMembers] = useState(null)

    useEffect(() => {
        const getCrewMembers = async () => {
            const { data, error } = await supabase
                .from('Crew members')
                .select()
                .order('created_at', { ascending: true })

            if (error) {
                console.error('Error fetching crew members:', error)
            } else {
                setCrewMembers(data)
            }
        }

        getCrewMembers().catch(console.error)
    }, []);

  return (
    <div className="crew-gallery-container">
        <h1>Crew Gallery</h1>
        <p>Here you can view your crew of characters.</p>
        <p>Use the navigation to create a new crew or view existing ones.</p>
        <p>Enjoy your adventure!</p>
        <div className="crew-member-cards">
            {crewMembers && crewMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
            ))}
        </div>
        {crewMembers && crewMembers.length === 0 && (
            <div className="no-crew-members">
                <h2>No crew members found.</h2>
                <p>Please create a new crew member.</p>
            </div>
        )}
        
    </div>
  )
}

export default CrewGallery
