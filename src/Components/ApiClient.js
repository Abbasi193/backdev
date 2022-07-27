import React, { useState } from 'react'
import axios from "axios";
import './styles/ApiClient.css'
import tick from "../logos/tick1.png"

export default function ApiClient() {

  const [params, setParams] = useState({});
  const [keyy, setKeyy] = useState("");
  const [val, setVal] = useState("")
  const [meth, setMeth] = useState("get")
  const [url, setUrl] = useState("http://localhost:8000/index")
  const [res, setRes] = useState("");
  const [keyVal, setKeyVal] = useState([]);
  



  const handleDelete = (e) => {
    console.log(e.target.name)
     setKeyVal(keyVal.filter((keyVal) => keyVal.key !== e.target.name))
     delete params[e.target.name];
    
  }

  const addParams = () => {
    console.log(keyy);
    console.log(val);
   
  
      setParams({...params, [keyy]:val});

      setKeyVal([...keyVal, {key: keyy, val: val}])
      
     
    setKeyy("");
    setVal("");

  }

  const sendRequest = () => {
    console.log(keyVal);
    console.log(params);
    console.log(meth);
    console.log(url);
    

    var size = Object.keys(params).length;


    if(meth == 'get'){
      console.log("inside get")
      axios
      .get(`${url}`)
      .then((response) => {
        let r = JSON.stringify(response.data);
       
        if(size > 0){
          r = r + JSON.stringify(params)
        }
        
        setRes(r);
        console.log(response.data);
        console.log(r + JSON.stringify(params));
      });
    }

    else if(meth == 'post'){
      
      axios
      .post(`${url}`, params)
      .then((response) => {
      
        let r = JSON.stringify(response.data);
        if(size > 0){
          r = r + JSON.stringify(params)
        }
        
        setRes(r);

        
      });
    }

    else if(meth == 'put'){
      
      axios
      .put(`${url}`, params)
      .then((response) => {

        
        let r = JSON.stringify(response.data);
        if(size > 0){
          r = r + JSON.stringify(params)
        }
        
        setRes(r);

        
      });
    }

    else if(meth == 'delete'){
      
      axios
      .delete(`${url}`)
      .then((response) => {

        
        let r = JSON.stringify("Deleted successfully");
        if(size > 0){
          r = r + JSON.stringify(params)
        }
        
        
        setRes(r);

        
      });
    }

    setParams({});
    setKeyVal([])

    
  }


  return (
      <>
    <h2>API Client Postman</h2>
    <input className="apireq" type = "text" value={url} onChange={e => setUrl(e.target.value)}/>
    <select className='drop' name="apimeth" id="apimeth" onChange={e => setMeth(e.target.value)}>
    <option value="get">get</option>
    <option value="post">post</option>
    <option value="delete">delete</option>
    <option value="put">put</option>
  </select>
  <input className="buu" type="button" value="Send" onClick={sendRequest}/><br />
  <div className='keyval'>
  <input className="tex" type="text" placeholder='key' value={keyy} onChange={e => setKeyy(e.target.value)}/>
  <input className="tex" type="text" placeholder='val' value={val} onChange={e => setVal(e.target.value)}/>
  <input className="buu" type="button" value="Add Params" onClick={addParams}/>
  </div>
  <br />
 
  <div className='divkeyval'>
    <ul className='lis'>
    {keyVal.map((keyval) => (
        <li className="user">key : {keyval.key}, val: {keyval.val}<button name={keyval.key} onClick={handleDelete}>x</button></li>
      ))}
    </ul>
  </div>
  

  <div className='responsePara'>{res}</div>

    </>
  )
}
