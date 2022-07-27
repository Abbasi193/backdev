import React, { useState } from 'react'
import axios from "axios";
import './styles/NewFolderPop.css'

export default function HerokuDeployment() {


    const [appName, setAppName] = useState("")
    

    const CreateHeroku = async (e) => {
        e.preventDefault()
       
      
    axios
      .post('http://localhost:5000/createheroku', {
        title: 'Heroku create app',
        appName: `${appName}`
      })
      .then((response) => {
        console.log(response);
        
      });
      //const data = await response.json();
      
      }

      const PushHeroku = async (e) => {
        e.preventDefault()
       


    axios
      .post('http://localhost:5000/pushheroku', {
        title: 'Push Changes to heroku'
      })
      .then((response) => {
        console.log(response);
        
      });
      //const data = await response.json();
      
      }

  return (

    


      <div>

        <h2>Heroku Deployment</h2>
        <input className='new1 tex' type="text" value={appName} placeholder="Enter App Name" onChange={event => setAppName(event.target.value)} />
        <input className="buu" type="button" value="Create New app" onClick={CreateHeroku} />

        <input className="buu" type="button" value="Push Heroku" onClick={PushHeroku} />

    </div>
  )
}
