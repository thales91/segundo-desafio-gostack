import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  useEffect(()=>{
    api.get('/repositories').then(result=>{
      setRepositories(result.data)
    })
    
  },[])
  async function handleAddRepository() {
    api.post('/repositories', {
      "title": "2432",
      "url": "24wsf",
      "techs": ["dfsf","sdf"]
      }).then(result =>{
       setRepositories([...repositories, result.data]) 
      })
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(result=>{
        const indexRepository = repositories.findIndex(repository=> repository.id == id)
        const rep = repositories.splice(indexRepository, 1)
        //setRepositories(repositories.length > 0 ? repositories : [])
        console.log(repositories)
        setRepositories([...repositories])
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map((repository)=>{
        return (<li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)
      })}
      
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
