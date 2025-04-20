import { useState, useEffect } from 'react'
import './App.css'
import { useRoutes, Link } from 'react-router-dom'
import CreateCrew from './components/CreateCrew.jsx'
import CrewGallery from './components/CrewGallery.jsx'
import Home from './components/Home.jsx'
import UpdateCrew from './components/UpdateCrew.jsx'
import CrewmateInfo from './components/CrewmateInfo.jsx'

function App() {
  const [list, setList] = useState(null)
  

  useEffect(() => {
    const getDevilFruit = async () => {
      const response = await fetch("https://api.api-onepiece.com/v2/fruits/en");
      const json = await response.json();

      setList(json);
      };
      getDevilFruit().catch(console.error);
    }, []);

  let element = useRoutes([
    {
      path: "/",
      element:(
        <>
          <Home />
        </>
    )
    },
    {
      path:"/create_crewmate",
      element:(
        <>
          <CreateCrew list = {list} />
        </>
      )
    },
    { 
      path:"/crewmates",
      element:(
        <>
          <CrewGallery />
        </>
      )
    },
    {
      path: "/update_crewmate/:name",
      element:(
        <>
          <UpdateCrew list = {list} />
        </>
      )
    },
    {
      path: "/crewmates/:name",
      element:(
        <>
          <CrewmateInfo list = {list} />
        </>
      )
    }
  ]);

  return (
    <div className="app">
      <div className="navbar">
        <ul>
          <li><img src='https://www.freepnglogos.com/uploads/one-piece-logo-18.png' alt='logo'></img></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create_crewmate">Create Crew</Link></li>
          <li><Link to="/crewmates">Crew Gallery</Link></li>
        </ul>
      </div>
      <div className="content">
        {element}
      </div>
    </div>
  )
}

export default App
