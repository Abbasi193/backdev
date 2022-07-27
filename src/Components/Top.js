import './styles/Top.css'
import run from '../logos/run.png'
import savefile from "../logos/savefile.png"
import generateCode from "../logos/generate.png"
import testCode from '../JointFuncs/CodeGenerator';
import saveState from '../JointFuncs/saveState';
import { useState, useContext } from 'react'
import { AppContext } from '../App.js'


function Top() {
    const { canvases, setCanvases ,setCode} = useContext(AppContext)
    return (
        <div className="top">
        
        <button onClick={() => { testCode(canvases,setCode);saveState(canvases) }} className='topBtn' title="Run"><img src={run} alt="runlogo" className='toplogos'/></button>
        <button className='topBtn' title="Save"><img src={savefile} alt="savefilelogo" className='toplogos'/></button>
        <button className='topBtn' title="Code generate"><img src={generateCode} alt="generateCodelogo" className='toplogos'/></button>
        </div>

    )
}

export default Top